---
title: ML Recommendation API Platform
summary: Personalized recommendation service that improved relevance and supported controlled experimentation with low-latency APIs.
status: active
stack:
  - Python
  - Scikit-learn
  - FastAPI
  - Redis
---

Personalized recommendation service that improved relevance and supported controlled experimentation with low-latency APIs.

## Problem

Personalization logic was embedded in application code, making iteration slow and recommendation quality difficult to measure.

## Approach

- Designed a dedicated recommendation API with offline model training and online inference.
- Implemented feature stores for user/item interaction signals.
- Added caching and fallback strategies to meet latency budgets.
- Introduced A/B testing hooks and model-version routing.

## Architecture

- Offline training pipeline for candidate generation and ranking models.
- Online inference API for user-context scoring and response assembly.
- Feature retrieval and cache layer for low-latency access to behavioral signals.
- Experimentation layer to route traffic between model versions.

## Tech Stack

- Python
- Scikit-learn
- FastAPI
- Redis

## Results

- Improved recommendation relevance across engagement-critical surfaces.
- Reduced median inference latency through cache-first candidate retrieval.
- Accelerated experimentation cycles with explicit model-version routing.

## Learnings

- Recommendation quality improves when experimentation is tightly coupled with business metrics.
- Cache invalidation strategy is as important as model quality for user experience.
- Feature freshness must be balanced with predictable inference latency.
