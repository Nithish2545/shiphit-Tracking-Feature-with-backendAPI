function getEstimatedDate(data) {
  const input = data.pickupCompletedDatatime; // Assume data is defined elsewhere
  if (!input) {
    return;
  }

  // Match the "7-11" pattern
  const match = input.match(/^\d+-\d+/);
  const result = match ? match[0] : null;

  if (!result) {
    console.error("Invalid date format");
    return;
  }

  // Split the result into day and month
  const [day, month] = result.split("-").map(Number);
  // Ensure the year is correctly handled
  const year = new Date().getFullYear(); // Default to the current year
  const date = new Date(year, month - 1, day); // Months are 0-indexed

  // Add 7 days
  date.setDate(date.getDate() + 7);

  // Format the new date as DD/MM/YYYY
  const newDay = String(date.getDate()).padStart(2, "0");
  const newMonth = String(date.getMonth() + 1).padStart(2, "0");
  const newYear = date.getFullYear();

  const newDate = `${newDay}/${newMonth}/${newYear}`;
  return newDate; // Output: 18/11/2024 + 7 days = 25/11/2024
}

function maskPhoneNumber(phoneNumber) {
  if (phoneNumber == " ") {
    return " ";
  }
  const numberStr = phoneNumber.toString(); // Ensure it's a string
  const countryCode = numberStr.slice(0, 3); // Extract the country code
  const lastTwo = numberStr.slice(-2); // Extract the last two digits
  const maskedPart = "*".repeat(numberStr.length - 5); // Mask the middle part
  return `${countryCode}${maskedPart}${lastTwo}`;
}

export default {
  getEstimatedDate: getEstimatedDate,
  maskPhoneNumber: maskPhoneNumber,
};
