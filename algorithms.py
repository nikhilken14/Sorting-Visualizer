import time

def get_sort_steps(arr, algorithm):
    steps = []
    a = arr.copy()

    def record():
        steps.append(a.copy())

    start_time = time.time()

    if algorithm == "Bubble Sort":
        n = len(a)
        for i in range(n):
            for j in range(n - i - 1):
                if a[j] > a[j + 1]:
                    a[j], a[j + 1] = a[j + 1], a[j]
                    record()

    elif algorithm == "Insertion Sort":
        for i in range(1, len(a)):
            key = a[i]
            j = i - 1
            while j >= 0 and a[j] > key:
                a[j + 1] = a[j]
                j -= 1
                record()
            a[j + 1] = key
            record()

    elif algorithm == "Selection Sort":
        for i in range(len(a)):
            min_idx = i
            for j in range(i + 1, len(a)):
                if a[j] < a[min_idx]:
                    min_idx = j
            a[i], a[min_idx] = a[min_idx], a[i]
            record()
            

    time_taken = round(time.time() - start_time, 3)
    return {"steps": steps, "sorted": a, "time": time_taken}
