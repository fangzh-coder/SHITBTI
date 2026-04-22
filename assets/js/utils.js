function resetScores() {
  return { S: 0, s: 0, H: 0, h: 0, I: 0, i: 0, T: 0, t: 0 };
}

function buildCode(scores) {
  const S1 = scores.S >= scores.s ? 'S' : 's';
  const H1 = scores.H >= scores.h ? 'H' : 'h';
  const I1 = scores.I >= scores.i ? 'I' : 'i';
  const T1 = scores.T >= scores.t ? 'T' : 't';
  return `${S1}${H1}${I1}${T1}`;
}

function getTraits(code) {
  const map = {
    S: '定时派', s: '临门一脚派',
    H: '主场派', h: '四海为家派',
    I: '仪式派', i: '速决派',
    T: '稳定派', t: '易炸派'
  };
  return code.split('').map((char) => map[char]);
}

function buildShareText(code, resultData, variant = 'A') {
  const tags = String(resultData.tags || '')
    .split('/')
    .map((item) => item.trim())
    .filter(Boolean)
    .join(' · ');

  const texts = {
    A: [
      '【SHITBTI 人格公示】',
      `我测出来是：${code}｜${resultData.name}`,
      '',
      `${resultData.summary}`,
      '',
      `损友锐评：${resultData.roast || resultData.friend}`,
      `行为标签：${tags}`,
      '',
      '不装了，我上厕所确实有完整人格。你也来测测。'
    ].join('\n'),
    B: [
      '《国际排便行为研究院 · 个体如厕行为鉴定书》',
      '',
      '受检对象：本人',
      `鉴定编码：${code}`,
      `人格称谓：${resultData.name}`,
      `研究院评级：${resultData.rarity || '已归档'}`,
      '',
      '【研究结论】',
      `${resultData.summary}`,
      '',
      '【行为侧写】',
      `${resultData.description}`,
      '',
      '【民间证词】',
      `${resultData.friend}`,
      '',
      '如果你也怀疑自己只是普通上厕所，建议立即接受 SHITBTI 测评。很多人测完才发现，自己根本不是去厕所，而是在执行一套高度人格化的日常仪式。'
    ].join('\n')
  };

  return texts[variant] || texts.A;
}

async function copyText(text) {
  if (!text) return false;
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    return false;
  }
}

function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight) {
  const chars = String(text || '').split('');
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
}

function drawRoundedRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();

  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(x, y, width, height, r);
    return;
  }

  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function getThemeByCode(code) {
  const themes = [
    {
      bg1: '#f6fffb',
      bg2: '#eefaf6',
      accent: '#0f766e',
      accentSoft: '#d9f3ec',
      text: '#12312d',
      sub: '#55726c'
    },
    {
      bg1: '#fffaf5',
      bg2: '#fff1e6',
      accent: '#c2410c',
      accentSoft: '#fde7d8',
      text: '#3d1f14',
      sub: '#7d5a4f'
    },
    {
      bg1: '#faf7ff',
      bg2: '#f1ebff',
      accent: '#6d28d9',
      accentSoft: '#eadcff',
      text: '#2e1d54',
      sub: '#6b5a90'
    },
    {
      bg1: '#f5fbff',
      bg2: '#e8f3ff',
      accent: '#1d4ed8',
      accentSoft: '#dae8ff',
      text: '#162d5c',
      sub: '#5f739e'
    }
  ];

  const seed = code.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return themes[seed % themes.length];
}

function generateShareImage(resultPayload) {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1400;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas 2D context is unavailable.');
  }

  const theme = getThemeByCode(resultPayload.code);
  const tags = String(resultPayload.tags || '')
    .split('/')
    .map((item) => item.trim())
    .filter(Boolean);

  const pageUrl = location && location.href && location.href.startsWith('http')
    ? location.href.replace(/#.*$/, '')
    : 'https://fangzh-coder.github.io/SHITBTI/';

  const gradient = ctx.createLinearGradient(0, 0, 1080, 1400);
  gradient.addColorStop(0, theme.bg1);
  gradient.addColorStop(1, theme.bg2);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = 'rgba(16,24,40,0.08)';
  ctx.lineWidth = 2;
  drawRoundedRect(ctx, 54, 54, 972, 1292, 36);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = theme.accentSoft;
  drawRoundedRect(ctx, 94, 92, 360, 52, 26);
  ctx.fill();

  ctx.fillStyle = theme.accent;
  ctx.font = 'bold 26px sans-serif';
  ctx.fillText('SHITBTI® 人格检测结果', 118, 126);

  ctx.fillStyle = theme.accent;
  ctx.font = 'bold 60px sans-serif';
  ctx.fillText(resultPayload.code, 94, 235);

  ctx.fillStyle = theme.text;
  ctx.font = 'bold 72px sans-serif';
  ctx.fillText(resultPayload.name, 94, 320);

  ctx.fillStyle = theme.sub;
  ctx.font = '30px sans-serif';
  const summaryLines = drawWrappedText(ctx, resultPayload.summary, 94, 388, 890, 44);
  let currentY = 388 + summaryLines * 44 + 40;

  ctx.strokeStyle = theme.accent;
  ctx.lineWidth = 4;
  drawRoundedRect(ctx, 800, 92, 160, 160, 24);
  ctx.stroke();

  ctx.fillStyle = theme.accent;
  ctx.font = 'bold 30px sans-serif';
  ctx.fillText('已鉴定', 835, 170);
  ctx.font = 'bold 18px sans-serif';
  ctx.fillText('INSTITUTE', 826, 202);

  resultPayload.traits.forEach((trait, index) => {
    const x = 94 + (index % 2) * 440;
    const y = currentY + Math.floor(index / 2) * 66;

    ctx.fillStyle = theme.accentSoft;
    drawRoundedRect(ctx, x, y, 390, 46, 22);
    ctx.fill();

    ctx.fillStyle = theme.accent;
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText(trait, x + 18, y + 30);
  });

  currentY += 160;

  ctx.fillStyle = '#f8fafc';
  drawRoundedRect(ctx, 94, currentY, 892, 170, 24);
  ctx.fill();

  ctx.fillStyle = theme.text;
  ctx.font = 'bold 28px sans-serif';
  ctx.fillText('一句话画像', 124, currentY + 42);

  ctx.fillStyle = theme.sub;
  ctx.font = '26px sans-serif';
  drawWrappedText(ctx, resultPayload.description, 124, currentY + 86, 832, 38);

  currentY += 200;

  ctx.fillStyle = '#fcfcfd';
  drawRoundedRect(ctx, 94, currentY, 892, 170, 24);
  ctx.fill();

  ctx.fillStyle = theme.text;
  ctx.font = 'bold 28px sans-serif';
  ctx.fillText('损友锐评', 124, currentY + 42);

  ctx.fillStyle = theme.sub;
  ctx.font = '26px sans-serif';
  drawWrappedText(ctx, resultPayload.roast || resultPayload.friend, 124, currentY + 86, 832, 38);

  currentY += 210;

  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = theme.accentSoft;
  ctx.lineWidth = 2;
  drawRoundedRect(ctx, 94, currentY, 892, 250, 24);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = theme.text;
  ctx.font = 'bold 28px sans-serif';
  ctx.fillText('传播版文案', 124, currentY + 42);

  ctx.fillStyle = theme.sub;
  ctx.font = '24px sans-serif';
  drawWrappedText(ctx, resultPayload.shortShareText, 124, currentY + 84, 832, 34);

  currentY += 280;

  ctx.fillStyle = theme.text;
  ctx.font = 'bold 28px sans-serif';
  ctx.fillText('行为标签', 94, currentY);

  let tagX = 94;
  let tagY = currentY + 28;
  tags.forEach((tag) => {
    const width = Math.max(110, ctx.measureText(tag).width + 40);
    if (tagX + width > 950) {
      tagX = 94;
      tagY += 58;
    }

    ctx.fillStyle = theme.accentSoft;
    drawRoundedRect(ctx, tagX, tagY, width, 40, 20);
    ctx.fill();

    ctx.fillStyle = theme.accent;
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText(tag, tagX + 18, tagY + 26);

    tagX += width + 14;
  });

  ctx.fillStyle = '#98a2b3';
  ctx.font = '22px sans-serif';
  ctx.fillText('仅供娱乐，不构成任何医疗建议', 94, 1288);

  ctx.fillStyle = theme.accent;
  ctx.font = 'bold 22px sans-serif';
  ctx.fillText(pageUrl, 94, 1326);

  return canvas.toDataURL('image/png');
}

function downloadDataUrl(dataUrl, filename) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

window.SHITBTI_UTILS = {
  resetScores,
  buildCode,
  getTraits,
  buildShareText,
  copyText,
  drawWrappedText,
  drawRoundedRect,
  getThemeByCode,
  generateShareImage,
  downloadDataUrl
};
