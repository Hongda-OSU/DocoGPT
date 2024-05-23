import os

from tools import get_graph

os.environ["OPENAI_API_KEY"] = "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"

from fastapi import FastAPI, File, UploadFile
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path

# from glob import graph, level, pos, embd
import glob
import pickle
from agent.agent_wu import AgentWU
from parser.pdf_parser import PDFParser
from config.yaml_config import YAMLConfig
from vectordb.chroma import Chroma
from pydantic import BaseModel

class Query(BaseModel):
    query: str


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

conf = YAMLConfig(file_path="data/search.yaml")
conf.load()
search_agent = AgentWU(config=conf).stream(keep=True)


def set_glob(file: Path):

    glob.level = 0
    glob.pos = 0

    # level = 0
    # pos = 0
    f = Path(f"data/{file.name}.pkl")
    db = Chroma(embedding_function=glob.embd)
    if f.exists():
        glob.graph = pickle.load(open(f, "rb"))
    else:
        conf_s = YAMLConfig(file_path="data/sum.yaml")
        conf_s.load()
        sum_agent = AgentWU(config=conf_s)
        parser = PDFParser(sum_agent)
        glob.graph = parser.from_file(file)
        pickle.dump(glob.graph, open(f"data/{file.name}.pkl", "wb"))


@app.post("/uploadfile/")
def create_upload_file(file: UploadFile):
    with open(f"data/{file.filename}", "wb") as f:
        f.write(file.file.read())
    set_glob(Path(f"data/{file.filename}"))
    return {"filename": file.filename}


# @app.post("/uploadfile/")
# def create_upload_file(file: str):
#     set_glob(Path(f"data/{file}"))
#     return {"filename": file}


@app.post("/chat/")
def chat(query: Query):
    # tmp = get_graph()
    # print(tmp)
    # return {"query": query}
    query = query.query
    def chat_stream():
        for i in search_agent.completion(
            f"{query} The root node is about:\n {glob.graph[-1][0]}"
        ):
            yield dict(type="agent", content=i)
        func, res = search_agent.process()
        if func:
            yield dict(type="func", content=res)
        while True:
            for i in search_agent.completion(""):
                yield dict(type="agent", content=i)
            func, res = search_agent.process()
            if not func:
                break
            yield dict(type="func", content=res)

    
    ans = []
    for i in chat_stream():
        if len(ans) == 0 or ans[-1][-1]['type'] != i['type']:
            ans.append([i])
        else:
            ans[-1].append(i)
    ANS = []
    for i in ans:
        ANS.append("")
        for j in i:
            ANS[-1] += str(j['content'])

    

    return {"data": ANS}
