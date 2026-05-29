from backend.adaptive.analyzer import DatasetAnalyzer
from backend.adaptive.selector import AdaptiveSelector

from backend.algorithms.insertion_sort import insertion_sort
from backend.algorithms.quick_sort import quick_sort
from backend.algorithms.merge_sort import merge_sort
from backend.algorithms.heap_sort import heap_sort


def adaptive_hybrid_sort(arr):

    # Analyze dataset
    metrics = DatasetAnalyzer.analyze(arr)

    # Select best algorithm
    selection = (
        AdaptiveSelector.choose_algorithm(metrics)
    )
    selected_algorithm = selection["algorithm"]

    # Execute selected algorithm

    if selected_algorithm == "Insertion Sort":

        result = insertion_sort(arr)

    elif selected_algorithm == "Merge + Insertion Hybrid":

        result = merge_sort(arr)

    elif selected_algorithm == "Heap Sort":

        result = heap_sort(arr)

    elif selected_algorithm == "Quick + Heap Hybrid":

        result = quick_sort(arr)

    else:

        result = quick_sort(arr)

    # Add adaptive intelligence data
    result["dataset_analysis"] = metrics

    result["selected_algorithm"] = selected_algorithm
    result["ai_confidence"] = selection["confidence"]
    result["ai_reason"] = selection["reason"]
    return result