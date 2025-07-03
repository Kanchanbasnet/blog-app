import supabase from "../config/connection.js";
import cron from 'node-cron';

const deleteOTPAfterExpiry = async () => {
  try {
    const { data: usersData, error: usersError } = await supabase
      .from("users")
      .select("email")
      .eq("is_verified", true);
    if (usersError) {
      console.error("An error has been occured::", usersError);
    }

    const verifiedEmails = usersData.map((user) => user.email);

    if (verifiedEmails.length > 0) {
      const { error: verifiedDeleteError } = await supabase
        .from("email_verification")
        .delete()
        .in("email", verifiedEmails);
      if (verifiedDeleteError) {
        console.error(
          "Failed to delete OTPs for verified users:",
          verifiedDeleteError
        );
      } else {
        console.log("OTPs for verified users deleted.");
      }
    }
    const now = new Date().toISOString();
    const { error: expiredError } = await supabase
      .from("email_verification")
      .delete()
      .lt("expires_at", now);

    if (expiredError) {
      console.error("Failed to delete expired OTPs:", expiredError);
    } else {
      console.log("Expired OTPs deleted.");
    }
  } catch (error) {
    console.error("Error occured:::", error);
  }
};

cron.schedule('*/10 * * * *', async ()=>{
    try{
    console.log("Cron job started.....")
    await deleteOTPAfterExpiry();

    }
    catch(error){
        console.error("Error occured:::", error)
    }
    
})



