import { Decoder, guard } from "decoders";

export function guardOr<T>(decoder: Decoder<T>, data: unknown, _default: T) {
  try {
    return guard(decoder)(data);
  } catch {
    return _default;
  }
}
