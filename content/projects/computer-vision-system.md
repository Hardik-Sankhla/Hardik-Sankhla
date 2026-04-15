---
title: Computer Vision System
summary: Real-time quality inspection pipeline that improved defect detection consistency and accelerated root-cause analysis on production lines.
status: active
stack:
  - Python
  - YOLOv8
  - OpenCV
  - TensorFlow
---

Real-time quality inspection pipeline that improved defect detection consistency and accelerated root-cause analysis on production lines.

## Problem

Manual inspection introduced inconsistency, higher operational cost, and delayed defect detection in production lines.

## Approach

- Built a video ingestion and frame-processing pipeline optimized for low-latency inference.
- Trained and tuned YOLO-based detection for domain-specific defect classes.
- Integrated OpenCV tracking to maintain object continuity across frames.
- Added threshold-based alerting and logging for downstream quality analytics.

## Architecture

- Edge capture service for camera feeds and frame buffering.
- Inference service for detection and confidence filtering.
- Tracking layer to maintain object continuity and reduce duplicate alerts.
- Event stream into quality analytics storage for trend monitoring and audits.

## Tech Stack

- Python
- YOLOv8
- OpenCV
- TensorFlow

## Results

- Improved defect detection consistency versus manual spot-check process.
- Reduced missed-defect rate in high-throughput scenarios after calibration cycles.
- Enabled faster root-cause analysis with traceable detection logs and sample playback.

## Learnings

- Data quality and camera calibration materially affect model performance stability.
- Tracking and post-processing are critical for reducing alert fatigue.
- Operators need explainable visual overlays to trust AI-assisted inspection decisions.
