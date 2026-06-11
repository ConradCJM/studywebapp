import { supabase } from "@/lib/supabase"

export default async function Page() {

  const { data, error } = await supabase
    .from("profiles")
    .select("*")

  return (
    <pre style={{ whiteSpace: "pre-wrap" }}>
      {JSON.stringify({ data, error }, null, 2)}
    </pre>
  )

}
