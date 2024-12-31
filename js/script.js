const modal = new bootstrap.Modal('#modal');

modal.show();

const state = {
    curBlock: "select"
};

const mixRatioBtn = document.querySelector('#mix-ratio-btn');
const strengthBtn = document.querySelector('#strength-btn');

mixRatioBtn.addEventListener('click', () => {
    showBlock('calc-mix-ratio');
});

strengthBtn.addEventListener('click', () => {
    showBlock("calc-strength");
});


const calcBtn = document.querySelector('#calcBtn');

calcBtn.addEventListener('click', () => {
    console.log(state.curBlock)
    if (state.curBlock === 'calc-strength') {
        calcCompressiveStrength();
    }
    // modal.hide();
});

const backBtn = document.querySelector('#backBtn');

backBtn.addEventListener('click', () => {
    showBlock('select');
});

// utility functions
const showBlock = (name) => {
    const curBlock = document.querySelector(`#${state.curBlock}`);

    curBlock.classList.remove('d-block');
    curBlock.classList.add('d-none');

    const block = document.querySelector(`#${name}`);
    block.classList.remove('d-none');
    block.classList.add('d-block');

    if (name === "select") {
        block.classList.add('d-flex');
    }

    state.curBlock = name;
};

const calcCompressiveStrength = () => {
    const s1 = Number.parseFloat(document.querySelector('#wc').value);
    const s2 = Number.parseFloat(document.querySelector('#sc').value);
    const s3 = Number.parseFloat(document.querySelector('#gc').value);
    const s4 = Number.parseFloat(document.querySelector('#ac').value);

    const S = s1 + s2 + s3 + s4;
    const x1 = s1 / S;
    const x2 = s2 / S;
    const x3 = s3 / S;
    const x4 = s4 / S;

    const y6 = 132.30 * x1 - 436.95 * x2 + 581.17 * x3 - 212.94 * x4 + 645.85 * x1 ^ 2 + 378.03 * x2 ^ 2 - 663.44 * x3 ^ 2 + 0.30 * x4 ^ 2 + 153.99 * x1 * x2 + 621.13 * x1 * x3 - 820.80 * x1 * x4 - 325.59 * x2 * x3 - 74.70 * x2 * x4 - 7.79 * x3 * x4;

    // Test to see if the browser supports the HTML template element by checking
    // for the presence of the template element's content attribute.
    if ("content" in document.createElement("template")) {
        // Instantiate the list with the existing HTML tbody
        // and the row with the template
        const resultList = document.querySelector("#result-list");
        const template = document.querySelector("#result-template");

        // Clone the new row and insert it into the table
        const clone = template.content.cloneNode(true);

        let li = clone.querySelectorAll("li");
        // W/C
        li[0].querySelector('span').textContent = s1;
        // S/C
        li[1].querySelector('span').textContent = s2;
        // G/C
        li[2].querySelector('span').textContent = s3;
        // A/C
        li[3].querySelector('span').textContent = s4;
        // 28 day strength
        li[4].querySelector('span').textContent = y6;

        resultList.appendChild(clone);
    } else {
        // Find another way to add the rows to the table because
        // the HTML template element is not supported.
    }

    modal.hide();

    console.log({ x1, x2, x3, x4, x: x1 + x2 + x3 + x4 })
}

const resetBtn = document.querySelector('#reset');

resetBtn.addEventListener('click', () => {
    modal.show();
});
