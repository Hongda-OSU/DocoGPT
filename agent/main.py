from vectordb import Chroma
from chromadb.utils import embedding_functions
import os
os.environ ["OPENAI_API_KEY"] = ""
import chromadb
from config import YAMLConfig
from parser import TableParser, PDFParser
from agent import AgentWU
from tools import *
# from glob import graph
import glob

# global GRAPH
# from agent.agent_wu import add

if __name__ == '__main__':
    # global graph
    conf = YAMLConfig(file_path="data/search.yaml")
    conf.load()
    search_agent = AgentWU(config=conf)
    search_agent.stream(keep = True)
    for i in glob.graph:
        print(len(i))
    
    for i in search_agent.completion(f"Which port the server will start with? The root node is about:\n {graph[-1][0]}"):
        print(i, end='',flush=True)
    search_agent.process()
    # print(search_agent.history[-1])
    print("\n" + "-"*10)
    while True:
        input()
        for i in search_agent.completion(""):
            print(i, end='',flush=True)
        search_agent.process()
        # print(search_agent.history[-1])
        print("\n" + "-"*10)
        
    
    
    
    
        