// Shared result contract for server actions.
//
//   success → { ok: true, message, data? }
//   failure → { error: true, message, code? }
//
// Callers branch on `res.ok` / `res.error` and hand `res.message` to a toast.
// `code` lets a client react to a specific failure (e.g. redirect to /login on
// UNAUTHENTICATED). Actions return failures — they never throw — so a bad call
// can't leak a stack trace or the generic "An error occurred" page.
export type ActionErrorCode =
    | "UNAUTHENTICATED"
    | "FORBIDDEN"
    | "VALIDATION"
    | "CONFLICT"
    | "NOT_FOUND";

export type ActionOk<T = undefined> = { ok: true; error?: undefined; message: string; data?: T };
export type ActionErr = { error: true; ok?: undefined; message: string; code?: ActionErrorCode };
export type ActionResult<T = undefined> = ActionOk<T> | ActionErr;

export function ok<T = undefined>(message: string, data?: T): ActionOk<T> {
    const result: ActionOk<T> = { ok: true, message };
    if (data !== undefined) result.data = data;
    return result;
}

export function fail(message: string, code?: ActionErrorCode): ActionErr {
    const result: ActionErr = { error: true, message };
    if (code) result.code = code;
    return result;
}
