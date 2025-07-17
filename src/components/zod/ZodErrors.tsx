export function ZodErrors({ error }: { error: string[] | undefined }) {
    if (typeof error === "string") {
      return <div className="text-red-500 italic mt-1">{error}</div>;
    }
    if (!error) return null;
    return error.map((err: string, index: number) => (
      <div key={index} className="text-red-500 italic mt-1">
        {err}
      </div>
    ));
  }