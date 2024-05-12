from agent.base import BaseAgent
from .base_parser import BaseParser
from pathlib import Path
from typing import Dict, Any
import pandas as pd
import json
from datetime import datetime
from graph import Graph, Node, Edge
from pypdf import PdfReader
from tqdm import tqdm


class PDFParser(BaseParser):
    def __init__(self, agent: BaseAgent, max_length: int = 1024, force_split_length: int = 4096) -> None:
        self.agent = agent
        self.max_length = max_length
        self.force_split_length = force_split_length
        super().__init__()

    def process(self, path: Path) -> Graph:
        reader, ans = PdfReader(path), []
        data = "".join([i.extract_text() for i in reader.pages]).splitlines()
        processed, tmp = [], ""
        for i in data:
            # print(i)
            tmp += i
            if (l := len(tmp)) > self.force_split_length:
                processed.append[tmp[:self.force_split_length]]
                tmp = tmp[self.force_split_length:]
                continue
            if l >= self.max_length:
                processed.append(tmp)
                tmp = ""
        ans.append(processed)
        tmp = [i for i in processed]
        while len(tmp) > 1:
            _ans = []
            for i in tqdm(range(0, len(tmp), 2)):
                resp = self.agent.completion(f"{tmp[i]}\n\n{tmp[i + 1] if i + 1 < len(tmp) else ''}")
                _ans.append(resp.content)
                self.agent.history = self.agent.history[1:]
            tmp = _ans
            ans.append(tmp)
        ans.reverse()
        return ans
        
    


        


