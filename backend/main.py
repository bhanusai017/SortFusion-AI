from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from backend.algorithms.introsort import adaptive_hybrid_sort
from backend.algorithms.insertion_sort import insertion_sort
from backend.algorithms.quick_sort import quick_sort
from backend.algorithms.merge_sort import merge_sort
from backend.algorithms.heap_sort import heap_sort

app = FastAPI(
    title="SortFusion AI",
    description="Hybrid Adaptive Sorting Engine",
    version="1.0"
)

# Allow frontend connections
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SortRequest(BaseModel):
    data: list[int]


@app.get("/")
def home():

    return {
        "message": "SortFusion AI Backend Running"
    }


@app.post("/sort")
def sort_data(request: SortRequest):

    result = adaptive_hybrid_sort(request.data)

    return result
@app.post("/compare")
def compare_algorithms(request: SortRequest):

    data = request.data

    insertion = insertion_sort(data)
    quick = quick_sort(data)
    merge = merge_sort(data)
    heap = heap_sort(data)
    adaptive = adaptive_hybrid_sort(data)

    return {
        "algorithms": [
            insertion,
            quick,
            merge,
            heap,
            adaptive
        ]
    }