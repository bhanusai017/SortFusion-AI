import time
import tracemalloc


comparisons = 0
swaps = 0


def heapify(arr, n, i):

    global comparisons
    global swaps

    largest = i

    left = 2 * i + 1
    right = 2 * i + 2

    if left < n:

        comparisons += 1

        if arr[left] > arr[largest]:
            largest = left

    if right < n:

        comparisons += 1

        if arr[right] > arr[largest]:
            largest = right

    if largest != i:

        arr[i], arr[largest] = arr[largest], arr[i]

        swaps += 1

        heapify(arr, n, largest)


def heap_sort(arr):

    global comparisons
    global swaps

    comparisons = 0
    swaps = 0

    arr = arr.copy()

    n = len(arr)

    tracemalloc.start()

    start_time = time.perf_counter()

    # Build max heap
    for i in range(n // 2 - 1, -1, -1):

        heapify(arr, n, i)

    # Extract elements
    for i in range(n - 1, 0, -1):

        arr[i], arr[0] = arr[0], arr[i]

        swaps += 1

        heapify(arr, i, 0)

    end_time = time.perf_counter()

    current, peak = tracemalloc.get_traced_memory()

    tracemalloc.stop()

    return {
        "algorithm": "Heap Sort",
        "sorted_array": arr,
        "execution_time": round(end_time - start_time, 6),
        "memory_usage": round(peak / 1024, 2),
        "comparisons": comparisons,
        "swaps": swaps
    }