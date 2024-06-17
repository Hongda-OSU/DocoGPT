# DocoGPT
### What is DocoGPT?
- DocoGPT is a platform for document analysis, summarization, and Q&A using Retrieval-Augmented Generation with LLMs.
- We also build a simple frontend for DocoGPT, below is an example of what DocoGPT achieved. 

![](https://raw.githubusercontent.com/Hongda-OSU/PicGo-2.3.1/master/img204316.png)

### Design for DocoGPT
- DocoGPT is aimed to achieve higher accuracy in finding answers related to user’s question in the vector database by employing a hierarchical information architecture. 
- Instead of embedding the document content as a whole, DocoGPT use GPT-4 to split documents into sections and create summaries, building a document tree where document sections forms the leaf nodes and parent nodes are summaries of their children.
- The Design Diagram is here: [Link](https://lucid.app/lucidchart/2f64abf0-ffe1-4061-a545-9509a62c5d11/edit?viewport_loc=-704%2C-130%2C3328%2C1562%2C0_0&invitationId=inv_dfed4aea-24dc-46a0-8eca-5c6c7e73e875)

![](https://raw.githubusercontent.com/Hongda-OSU/PicGo-2.3.1/master/img204759.png)

### Known Issues
- Time-consuming tree construction, if the document is big. We recommend document of size 1 - 8 pages.
- High token consumption, related to the previous issue.
- PDF parsing sometime don't work.

