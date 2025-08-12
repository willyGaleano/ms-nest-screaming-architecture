export function omitFalsyValues<T extends Record<PropertyKey, unknown>>(
  obj: T,
  options: {
    removeNull?: boolean;
    removeUndefined?: boolean;
    removeEmptyStrings?: boolean;
  } = {},
): Partial<T> | null {
  const {
    removeNull = false,
    removeUndefined = true,
    removeEmptyStrings = false,
  } = options;

  const filteredEntries = Object.entries(obj).filter(([_, value]) => {
    if (removeUndefined && value === undefined) return false;
    if (removeNull && value === null) return false;
    if (removeEmptyStrings && value === '') return false;
    return true;
  });

  if (filteredEntries.length === 0) return null;

  return Object.fromEntries(filteredEntries) as Partial<T>;
}

export function omitUndefined<T extends Record<PropertyKey, any>>(
  obj: T,
): Partial<T> | null {
  return omitFalsyValues(obj, { removeUndefined: true });
}

export function omitNullish<T extends Record<PropertyKey, any>>(
  obj: T,
): Partial<T> | null {
  return omitFalsyValues(obj, { removeNull: true, removeUndefined: true });
}

export function omitEmpty<T extends Record<PropertyKey, any>>(
  obj: T,
): Partial<T> | null {
  return omitFalsyValues(obj, {
    removeNull: true,
    removeUndefined: true,
    removeEmptyStrings: true,
  });
}
