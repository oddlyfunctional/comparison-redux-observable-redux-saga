# Comparison redux-observable and redux-saga

## Setup

```
git clone https://github.com/oddlyfunctional/comparison-redux-observable-redux-saga.git
git cd comparison-redux-observable-redux-saga

gem install bundler
bundle

yarn
```

## Running

```
foreman start
```

## Comparison

|---|redux-observable|redux-saga|
|---|----------------|----------|
|**Style**|Nested pipelines, need to reason how many times you need to "unpack" an Observable|Synchronous-looking code; can be deceiving|
|**Learning curve**|Several operators, though simple API. The reasoning is not straight-forward|Small set of effects, API almost inexistent besides the operators themselves|
|**Async primitives**|Introduces the Observable primitive, which unifies all async APIs. Perfect ergonomy for streamings.|Uses promises and event channels (API similar to Observable). There's no built-in solution for streamings, but it's not difficult to write one using the effects.|
|**Extensability**|Easy to create new operators and new adapters for custom async operations that are not yet adapted|Easy to use existing effects with custom promises, but it's not possible to create new effects|
|**Browser support**|[https://github.com/ReactiveX/rxjs/issues/998](https://github.com/ReactiveX/rxjs/issues/998)|Couldn't find; probably the same as the generator transpiler [https://facebook.github.io/regenerator/](https://facebook.github.io/regenerator/)|
|**Documentation**|Kinda confusing, there's a general Rx documentation and a specific for RxJS. The easiest way to understand the operators is through the [RxJS Marbles](http://rxmarbles.com/) website.|Extensive and clear documentation with several practical examples.|
|**Community**|Smaller redux-observable community, but giant Rx community.|The standard solution for advanced async patterns for the redux community.|
|**Sponsors**|Microsoft and Google (standard dependency in Angular).|No big sponsors (the biggest is Rollbar).|
|**Usefulness outside of the scope of the application**|Uses Rx with principles of functional programming|Uses go-like CSP model|
