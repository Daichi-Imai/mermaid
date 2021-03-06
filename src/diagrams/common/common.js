export const getRows = s => {
  if (!s) return 1;
  let str = breakToPlaceholder(s);
  str = str.replace(/\\n/g, '#br#');
  return str.split('#br#');
};

export const sanitizeText = (text, config) => {
  let txt = text;
  let htmlLabels = true;
  if (
    config.flowchart &&
    (config.flowchart.htmlLabels === false || config.flowchart.htmlLabels === 'false')
  )
    htmlLabels = false;

  if (config.securityLevel !== 'loose' && htmlLabels) {
    // eslint-disable-line
    txt = breakToPlaceholder(txt);
    txt = txt.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    txt = txt.replace(/=/g, '&equals;');
    txt = placeholderToBreak(txt);
  }

  return txt;
};

const breakToPlaceholder = s => {
  return s.replace(/<br\s*\/?>/gi, '#br#');
};

const placeholderToBreak = s => {
  return s.replace(/#br#/g, '<br/>');
};

export default {
  getRows,
  sanitizeText
};
