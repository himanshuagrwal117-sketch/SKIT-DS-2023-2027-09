
import supabase from "./supabase.js";

async function testConnection() {
  const { data, error } = await supabase
    .from("event_requests")
    .select("id")
    .limit(1);

  if (error) {
    console.error("❌ Supabase Error:", error.message);
  } else {
    console.log("✅ Supabase connected successfully!");
    console.log("Data:", data);
  }
}

testConnection();
