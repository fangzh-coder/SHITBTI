(function initApp() {
  const questions = window.SHITBTI_QUESTIONS;
  const results = window.SHITBTI_RESULTS;
  const {
    resetScores,
    buildCode,
    getTraits,
    buildShareText,
    copyText,
    generateShareImage,
    downloadDataUrl
  } = window.SHITBTI_UTILS;

  const screens = {
    home: document.getElementById('screen-home'),
    quiz: document.getElementById('screen-quiz'),
    result: document.getElementById('screen-result')
  };

  const AXIS_TEXT = {
    S: '定时派：身体里像装了隐形闹钟',
    s: '临门一脚派：不来则已，来了就要立刻执行',
    H: '主场派：熟悉环境能显著提升发挥质量',
    h: '四海为家派：有坑位就能把事情办妥',
    I: '仪式派：流程、氛围与沉浸感都很重要',
    i: '速决派：进入、执行、撤离，一气呵成',
    T: '稳定派：整体状态相对可控，节奏明确',
    t: '易炸派：肠道天气多变，风险随时抬头'
  };

  const el = {
    startBtn: document.getElementById('start-btn'),
    progressLabel: document.getElementById('progress-label'),
    progressBar: document.getElementById('progress-bar'),
    scanText: document.getElementById('scan-text'),
    questionTitle: document.getElementById('question-title'),
    options: document.getElementById('options'),
    status: document.getElementById('status'),
    resultCode: document.getElementById('result-code'),
    resultName: document.getElementById('result-name'),
    resultSummary: document.getElementById('result-summary'),
    resultDescription: document.getElementById('result-description'),
    resultFriend: document.getElementById('result-friend'),
    resultRisks: document.getElementById('result-risks'),
    resultTags: document.getElementById('result-tags'),
    traits: document.getElementById('traits'),
    sharePreview: document.getElementById('share-preview'),
    restartBtn: document.getElementById('restart-btn'),
    copyBtn: document.getElementById('copy-btn'),
    shareImageBtn: document.getElementById('share-image-btn'),
    variantABtn: document.getElementById('variant-a-btn'),
    variantBBtn: document.getElementById('variant-b-btn'),
    resultRarity: document.getElementById('result-rarity'),
    resultRhythm: document.getElementById('result-rhythm'),
    resultScene: document.getElementById('result-scene'),
    resultStyle: document.getElementById('result-style'),
    resultStability: document.getElementById('result-stability'),
    resultRoast: document.getElementById('result-roast'),
    resultAdvice: document.getElementById('result-advice')
  };

  const scanTexts = [
    '肠道扫描启动中……',
    '便意信号正在建模……',
    '如厕人格轮廓逐渐清晰……',
    '正在比对全球排便样本……',
    '请勿在分析完成前擅自离开工位……'
  ];

  let currentQuestionIndex = 0;
  let scores = resetScores();
  let currentResultText = '';
  let currentResultCode = '';
  let currentResultData = null;
  let currentCopyVariant = 'A';

  function showScreen(name) {
    Object.values(screens).forEach(function(screen) { screen.classList.add('hidden'); });
    screens[name].classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function updateSharePreview() {
    if (!currentResultData || !currentResultCode) return;
    currentResultText = buildShareText(currentResultCode, currentResultData, currentCopyVariant);
    el.sharePreview.textContent = currentResultText;
    el.variantABtn.classList.toggle('is-active', currentCopyVariant === 'A');
    el.variantBBtn.classList.toggle('is-active', currentCopyVariant === 'B');
  }

  function renderQuestion() {
    const question = questions[currentQuestionIndex];
    const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
    el.progressLabel.textContent = '第 ' + (currentQuestionIndex + 1) + ' / ' + questions.length + ' 题';
    el.progressBar.style.width = progressPercent + '%';
    el.scanText.textContent = scanTexts[Math.min(Math.floor(currentQuestionIndex / 3), scanTexts.length - 1)];
    el.questionTitle.textContent = question.title;
    el.options.innerHTML = '';

    question.options.forEach(function(option) {
      const button = document.createElement('button');
      button.className = 'option';
      button.textContent = option.text;
      button.addEventListener('click', function() {
        Object.entries(option.score).forEach(function(entry) {
          scores[entry[0]] += entry[1];
        });
        currentQuestionIndex += 1;
        if (currentQuestionIndex < questions.length) {
          renderQuestion();
          return;
        }
        renderResult();
      });
      el.options.appendChild(button);
    });
  }

  function renderResult() {
    const resultCode = buildCode(scores);
    const resultData = results[resultCode] || results.sHit;
    showScreen('result');
    currentResultCode = resultCode;
    currentResultData = resultData;
    currentCopyVariant = 'A';

    el.resultCode.textContent = resultCode;
    el.resultName.textContent = resultData.name;
    el.resultSummary.textContent = resultData.summary;
    el.resultDescription.textContent = resultData.description;
    el.resultFriend.textContent = resultData.friend;
    el.resultTags.textContent = resultData.tags;
    el.resultRarity.textContent = resultData.rarity || '已归档';
    el.resultRhythm.textContent = AXIS_TEXT[resultCode[0]];
    el.resultScene.textContent = resultData.scene || AXIS_TEXT[resultCode[1]];
    el.resultStyle.textContent = AXIS_TEXT[resultCode[2]];
    el.resultStability.textContent = AXIS_TEXT[resultCode[3]];
    el.resultRoast.textContent = resultData.roast || resultData.friend;
    el.resultAdvice.textContent = resultData.advice || '先认识自己的肠道节律，再决定你今天适不适合冒险。';

    el.resultRisks.innerHTML = '';
    resultData.risks.forEach(function(risk) {
      const item = document.createElement('li');
      item.textContent = risk;
      el.resultRisks.appendChild(item);
    });

    el.traits.innerHTML = '';
    getTraits(resultCode).forEach(function(trait) {
      const pill = document.createElement('span');
      pill.className = 'pill';
      pill.textContent = trait;
      el.traits.appendChild(pill);
    });

    updateSharePreview();
  }

  function startQuiz() {
    currentQuestionIndex = 0;
    scores = resetScores();
    currentResultText = '';
    currentResultCode = '';
    currentResultData = null;
    currentCopyVariant = 'A';
    el.status.textContent = '';
    el.copyBtn.textContent = '复制结果文案';
    el.shareImageBtn.textContent = '生成分享图';
    showScreen('quiz');
    renderQuestion();
  }

  async function handleCopy() {
    const copied = await copyText(currentResultText);
    if (!copied) {
      alert('复制失败了，你可以手动复制结果页内容。');
      return;
    }
    el.copyBtn.textContent = '已复制';
    setTimeout(function() {
      el.copyBtn.textContent = '复制结果文案';
    }, 1400);
  }

  function handleGenerateShareImage() {
    if (!currentResultData || !currentResultCode) {
      alert('请先完成测试，再生成分享图。');
      return;
    }
    try {
      const dataUrl = generateShareImage({
        code: currentResultCode,
        name: currentResultData.name,
        summary: currentResultData.summary,
        description: currentResultData.description,
        friend: currentResultData.friend,
        roast: currentResultData.roast,
        tags: currentResultData.tags,
        shortShareText: buildShareText(currentResultCode, currentResultData, 'A'),
        traits: getTraits(currentResultCode)
      });
      downloadDataUrl(dataUrl, 'shitbti-' + currentResultCode + '.png');
      el.shareImageBtn.textContent = '已下载分享图';
      setTimeout(function() {
        el.shareImageBtn.textContent = '生成分享图';
      }, 1500);
    } catch (error) {
      console.error('generate share image failed', error);
      alert('生成分享图失败：' + error.message);
    }
  }

  function switchVariant(variant) {
    currentCopyVariant = variant;
    updateSharePreview();
  }

  el.startBtn.addEventListener('click', startQuiz);
  el.restartBtn.addEventListener('click', startQuiz);
  el.copyBtn.addEventListener('click', handleCopy);
  el.shareImageBtn.addEventListener('click', handleGenerateShareImage);
  el.variantABtn.addEventListener('click', function() { switchVariant('A'); });
  el.variantBBtn.addEventListener('click', function() { switchVariant('B'); });
})();
