window.SHITBTI_UTILS = {
  resetScores() {
    return { S: 0, s: 0, H: 0, h: 0, I: 0, i: 0, T: 0, t: 0 };
  },

  buildCode(scores) {
    const S1 = scores.S >= scores.s ? 'S' : 's';
    const H1 = scores.H >= scores.h ? 'H' : 'h';
    const I1 = scores.I >= scores.i ? 'I' : 'i';
    const T1 = scores.T >= scores.t ? 'T' : 't';
    return `${S1}${H1}${I1}${T1}`;
  },

  getTraits(code) {
    const map = {
      S: '定时派', s: '临门一脚派',
      H: '主场派', h: '四海为家派',
      I: '仪式派', i: '速决派',
      T: '稳定派', t: '易炸派'
    };
    return code.split('').map((char) => map[char]);
  },

  buildShareText(code, resultData) {
    return `我测出来的 SHITBTI 拉屎人格是：${code}｜${resultData.name}。${resultData.summary} 你也来测测。`;
  },

  async copyText(text) {
    if (!text) return false;

    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      return false;
    }
  }
};
