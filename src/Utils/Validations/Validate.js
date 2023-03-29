export default function Validate(value, rules) {
  // let type = 'Validate';

  let isValid = true;
  let message = '';

  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];

    if (rule.type !== 'Validate') {
      let response = rule.validate(value);

      if (response !== null && response !== undefined) {
        isValid = false;
        message = response;
        break;
      }
    }
  }

  return {isValid, message};
}
