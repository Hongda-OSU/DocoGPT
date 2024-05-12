from gptfunction import gptfunction
import math
import numpy as np
from typing import Any
from glob import graph, embd, level, pos
from vectordb import Chroma

@gptfunction
def search(query: str, right: str) -> int:
    """
    Search query in vector db

    :param query: query text
    :param right: Which Node you want enter. right=1 means enter right Node.
    """
    db = Chroma(embedding_function=embd)
    global level
    global pos
    
    pos = min(pos * 2 + int(right), len(graph[-1]))
    db.add_texts([graph[-1][pos]])
    return [
        i.page_content for i in db.similarity_search(query, k=3)
    ]

@gptfunction
def run_python(code: str) -> Any:
    """
    Run python code using `exec`.  The content in local variable 'ans' will be returned, so you MUST put what you need to be returned in varible `ans`.

    :param code: python code you wanna run.
    :return: The value of the variable 'ans' after executing the code.
    """
    try:
        local_vars = dict()
        exec(code, {"math": math, "np": np}, local_vars)
        return local_vars.get("ans", None)
    except Exception as e:
        raise e
        return str(e)
    
@gptfunction
def get_next(right: str) -> str:
    """
    Select which Node you want enter.

    :param right: Which Node you want enter. right=1 means enter right Node.
    """
    global graph
    global level
    global pos
    # print(level, pos)
    level = level + 1
    pos = pos * 2 + int(right)
    pos = min(pos, len(graph[level]) - 1)
    # print(level, pos)
    l = pos * 2
    r = min(pos * 2 + 1, len(graph[level + 1]) - 1)
    ans = f"left:\n{graph[level + 1][l]}\nright:\n{graph[level + 1][r]}"
    # print("call", ans)
    if level == len(graph) - 2:
        ans += "\nThis is the last step you can search, you MUST call search next time"
    return ans
    