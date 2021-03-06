const renderQuizizz = () => {
  app.removeChild(selector);
  app.appendChild(pinIn);
  submitPin.addEventListener('click', () => {
    getQuizizzAnswers(pin.value);
  });
  // app.appendChild(load);
  // bar = new ldBar('#load', {
  //   preset: 'energy',
  //   value: 0,
  // });
  // getQuizizzAnswers();
};

const getQuizizzAnswers = async (pin) => {
  const data = await quizizz(pin);
  const test = data
  const error = false;
  console.log(data);
  if (error) {
    //Create error============================>
    const err = document.createElement('div');
    err.setAttribute('id', 'error');
    const errp = document.createElement('p');
    errp.textContent = error;
    err.appendChild(errp);
    //========================================>
    app.appendChild(err);
    app.appendChild(exit);
    new Notification('TestGetter', {
      icon: './assets/icons/Logo.ico',
      body: `${error}`,
    });
  } else {
    const results = [];
    for (let quest of Object.keys(test.questions)) {
      quest = test.questions[quest];
      // console.log(quest);
      const typo = quest.type;
      if (typo !== 'SLIDE') {
        const question = quest.structure.query.text;
        const answs = [];
        for (let answ in quest.structure.options) {
          answ = quest.structure.options[answ];
          answs.push(answ.text);
        }
        results.push(new Quest(question, answs, typo));
      }
    }
    const testR = new Test(results);
    const testTable = testR.render();
    app.removeChild(pinIn);
    app.appendChild(testTable);
    app.appendChild(exit);
  }
};
