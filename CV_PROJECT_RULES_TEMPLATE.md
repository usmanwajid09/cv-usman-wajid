# Comprehensive AI Assistant Rules for Computer Vision & Machine Learning Projects

This document contains industry-grade guidelines, coding standards, and repository workflows for high-performance Computer Vision (CV) and Deep Learning (DL) projects. Copy this file into your project root as `.cursorrules` (or `.clinerules`) before starting development.

---

## 1. Git & GitHub Workflow (Mandatory)
Every time a code modification, new model feature, or pipeline fix is requested:
* **Never commit directly to `main`/`master`**: Always work on a separate branch.
  - Branch naming: `feature/<name>`, `research/<model-name>`, or `bugfix/<name>`.
* **Stage & Commit**: Use Conventional Commits (e.g., `feat: integrate YOLOv8 object detector`, `perf: optimize frame processing thread`).
* **Push & PR**: Push the branch and create a Pull Request targeting `main` using `gh pr create`.
* **Submit Code Review**: Perform a code review using `gh pr review --comment --body "..."` highlighting performance changes, GPU utilization tips, or architectural changes before merging.

---

## 2. Code Quality & Language Standards (Python & C++)

### Python (Preferred for R&D)
* **Type Hinting**: Use type hints (`typing` module) for all functions, especially for dimensions of image tensors/arrays.
  - *Example*: `def preprocess(image: np.ndarray) -> torch.Tensor:`
* **Docstrings**: Document all inputs, outputs, and tensor shapes. Specify dimensions like `[B, C, H, W]` or `[H, W, C]`.
* **Strict Dependencies**: Do not use global installs. Always use a virtual environment (`venv` or `conda`) and document dependencies in `requirements.txt` or `environment.yml`.

### C++ (Preferred for Production/Edge Deployment)
* **Zero-Copy Memory**: Avoid copying large matrices. Pass `cv::Mat` by reference/const reference (`const cv::Mat& img`) where possible.
* **Modern C++**: Use smart pointers (`std::unique_ptr`, `std::shared_ptr`) for model managers and inference engines to prevent memory leaks.
* **Thread Safety**: Real-time processing loops must use mutexes or thread-safe queues when sharing frames between capture threads and inference threads.

---

## 3. Computer Vision & Deep Learning Practices

### Data Preprocessing & Augmentation
* **Color Space Consistency**: Always document and double-check color spaces. OpenCV uses **BGR** by default, while PyTorch, PIL, and TensorFlow use **RGB**. Explicitly convert using `cv2.cvtColor(img, cv2.COLOR_BGR2RGB)` when feeding images to deep models.
* **Normalization**: Match model expected normalization exactly. Ensure inputs are scaled to `[0.0, 1.0]` or normalized using ImageNet stats `mean=[0.485, 0.456, 0.406]`, `std=[0.229, 0.224, 0.225]` if using transfer learning.
* **Coordinate Mapping**: When resizing or padding images, ensure bounding box coordinates, landmarks, or segmentation masks are scaled/mapped accordingly.

### Model Development & Device Management
* **CUDA Device Handling**: Never hardcode `.cuda()` or `device="cuda"`. Always write device-agnostic code:
  - *Python*: `device = torch.device("cuda" if torch.cuda.is_available() else "cpu")`
* **GPU Memory Optimization**: 
  - Wrap inference loops in `with torch.no_grad():` or `with torch.inference_mode():`.
  - Call `torch.cuda.empty_cache()` if executing large batch jobs or clearing models.
  - Adjust batch sizes dynamically based on GPU RAM limits.
* **Reproducibility**: Set seeds for `numpy`, `random`, and `torch` at the start of training/experiment runs.

### Real-Time Video Pipelines
* **Multithreading**: Avoid locking the main thread during video capture. Use a separate worker thread or async process to read frames from webcams/IP cameras:
  ```python
  # Capture thread runs continuously; main loop fetches the latest frame
  ```
* **Frame Skipping**: If model latency is greater than the camera frame rate (e.g., 30fps = 33ms), implement a frame-skipping mechanism so the model is always processing the most recent frame rather than a backlog of old frames.

---

## 4. Architecture & Folder Structure
Structure the repository logically to keep experiments separated from production code:
```text
├── data/                  # Local datasets (ignored by git)
├── models/                # Saved weights (.pt, .onnx, .engine)
├── src/
│   ├── dataset.py         # Custom dataset loading and augmentations
│   ├── model.py           # Neural network architecture definitions
│   ├── train.py           # Training pipeline loop
│   ├── inference.py       # Live camera / video inference pipeline
│   └── utils.py           # Visualization, bbox overlays, metrics
├── tests/                 # Unit tests for preprocessing & model shapes
├── requirements.txt       # Dependencies list
└── .cursorrules           # This rules file
```

---

## 5. Logging, Visualization & Deployment

### Logging & Checkpointing
* **Checkpoints**: Automatically save best and latest model checkpoints during training. Include epoch number, optimizer state, and current loss/accuracy metric in the checkpoint file.
* **Metrics**: Use TensorBoard or Weights & Biases (W&B) to log training loss, validation loss, learning rates, and sample predictions.

### Visualizations
* **Bounding Boxes**: Use clear, readable overlays for predictions. Use high-contrast colors (e.g., green for correct, red for incorrect) and scale text thickness relative to the image resolution.
* **Overlay Handling**: Do not write directly over input frames unless they are copies, as modifying the input array can corrupt subsequent pipeline operations.

### Deployment & Export
* **ONNX/TensorRT**: Optimize models for production by exporting pytorch/tensorflow weights to ONNX format or compiling to TensorRT engines for edge deployment. Verify output parity between PyTorch and ONNX predictions.
