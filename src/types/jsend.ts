import { constant, Decoder, either, object } from "decoders";

export type JsendResult<S, F> = JsendSuccess<S> | JsendFail<F>;

export function jsendResultDecoder<S, F>(
  successDecoder: Decoder<S>,
  failDecoder: Decoder<F>
): Decoder<JsendResult<S, F>> {
  return either(
    jsendSuccessDecoder(successDecoder),
    jsendFailDecoder(failDecoder)
  );
}

export interface JsendSuccess<T> {
  status: "success";
  data: T;
}

export function jsendSuccessDecoder<T>(
  dataDecoder: Decoder<T>
): Decoder<JsendSuccess<T>> {
  return object({
    status: constant("success"),
    data: dataDecoder,
  }) as unknown as Decoder<JsendSuccess<T>>;
}

export interface JsendFail<T> {
  status: "fail";
  data: T;
}

export function jsendFailDecoder<T>(
  dataDecoder: Decoder<T>
): Decoder<JsendFail<T>> {
  return object({
    status: constant("fail"),
    data: dataDecoder,
  }) as unknown as Decoder<JsendFail<T>>;
}
