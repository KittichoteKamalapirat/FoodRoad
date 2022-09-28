export const formatphoneNumber = (phoneNum: string, countryCode: string) => {
  if (/^[+66\d+]{12}$/.test(phoneNum)) {
    // +66961234567 => 961234567
    phoneNum = phoneNum.slice(3);
  } else if (/^[66\d+]{11}$/.test(phoneNum)) {
    // 66961234567 => 961234567
    phoneNum = phoneNum.substring(2);
  } else if (/^[0\d+]{10}$/.test(phoneNum)) {
    // 0961234567 => 961234567
    phoneNum = phoneNum.substring(1);
  }

  return `+${countryCode}${phoneNum}`;
};
