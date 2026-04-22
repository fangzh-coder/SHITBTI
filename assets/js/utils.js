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

  buildShareText(code, resultData, variant = 'A') {
    const texts = {
      A: `我测出来的 SHITBTI 拉屎人格是：${code}｜${resultData.name}。${resultData.summary} 你也来测测。`,
      B: `刚做完 SHITBTI，我是 ${code}（${resultData.name}）。研究院判定：${resultData.summary} 快来看看你是哪一型。`
    };

    return texts[variant] || texts.A;
  },

  async copyText(text) {
    if (!text) return false;

    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      return false;
    }
  },

  drawWrappedText(ctx, text, x, y, maxWidth, lineHeight) {
    const chars = text.split('');
    let line = '';
    let lineCount = 0;

    chars.forEach((char) => {
      const testLine = line + char;
      const width = ctx.measureText(testLine).width;

      if (width > maxWidth && line) {
        ctx.fillText(line, x, y + lineCount * lineHeight);
        line = char;
        lineCount += 1;
      } else {
        line = testLine;
      }
    });

    if (line) {
      ctx.fillText(line, x, y + lineCount * lineHeight);
      lineCount += 1;
    }

    return lineCount;
  },

  generateShareImage(resultPayload) {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1350;

    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Card
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#d0d5dd';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(70, 70, 940, 1210, 28);
    ctx.fill();
    ctx.stroke();

    // Header block
    ctx.fillStyle = '#0f766e';
    ctx.font = 'bold 34px sans-serif';
    ctx.fillText('SHITBTI® 国际排便行为研究院', 120, 165);

    ctx.fillStyle = '#667085';
    ctx.font = '28px sans-serif';
    ctx.fillText('你的测试结果如下', 120, 215);

    ctx.fillStyle = '#0f766e';
    ctx.font = 'bold 56px sans-serif';
    ctx.fillText(resultPayload.code, 120, 320);

    ctx.fillStyle = '#1d2939';
    ctx.font = 'bold 68px sans-serif';
    ctx.fillText(resultPayload.name, 120, 400);

    ctx.fillStyle = '#667085';
    ctx.font = '34px sans-serif';
    const summaryLines = this.drawWrappedText(ctx, resultPayload.summary, 120, 470, 840, 52);

    const tagsTop = 510 + summaryLines * 52;

    // Traits pills
    resultPayload.traits.forEach((trait, index) => {
      const x = 120 + (index % 2) * 430;
      const y = tagsTop + Math.floor(index / 2) * 70;

      ctx.fillStyle = '#e8f4f2';
      ctx.beginPath();
      ctx.roundRect(x, y, 390, 48, 24);
      ctx.fill();

      ctx.fillStyle = '#0b5f58';
      ctx.font = 'bold 24px sans-serif';
      ctx.fillText(trait, x + 18, y + 32);
    });

    const infoTop = tagsTop + 170;

    ctx.fillStyle = '#1d2939';
    ctx.font = 'bold 30px sans-serif';
    ctx.fillText('一句话画像', 120, infoTop);

    ctx.fillStyle = '#667085';
    ctx.font = '26px sans-serif';
    this.drawWrappedText(ctx, resultPayload.shareText, 120, infoTop + 50, 840, 40);

    ctx.fillStyle = '#98a2b3';
    ctx.font = '24px sans-serif';
    ctx.fillText('仅供娱乐，不构成任何医疗建议', 120, 1180);

    ctx.fillStyle = '#0f766e';
    ctx.font = 'bold 26px sans-serif';
    ctx.fillText('👉 访问页面立即测试你的类型', 120, 1230);

    return canvas.toDataURL('image/png');
  },

  downloadDataUrl(dataUrl, filename) {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
};
