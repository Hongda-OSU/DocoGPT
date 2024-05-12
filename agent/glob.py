from agent.agent_wu import AgentWU
from config.yaml_config import YAMLConfig
from parser import PDFParser
from vectordb import Chroma
from chromadb.utils import embedding_functions
import chromadb
import pickle
from pathlib import Path

global graph
global embd
global level
global pos

level = 0
pos = 0

f = Path("data/graph.pkl")
embd = embedding_functions.DefaultEmbeddingFunction()
# client = chromadb.PersistentClient(path="data")
db = Chroma(embedding_function=embd)
if f.exists():
    graph = pickle.load(open("data/graph.pkl", "rb"))
else:
    conf = YAMLConfig(file_path="data/sum.yaml")
    conf.load()
    sum_agent = AgentWU(config=conf)
    parser = PDFParser(sum_agent)
    graph = parser.from_file("data/test.pdf")
    pickle.dump(graph, open("data/graph.pkl", "wb"))
