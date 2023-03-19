var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Card = /** @class */ (function () {
    function Card(points, question, answer, parentClass) {
        this.points = points;
        this.question = question;
        this.answer = answer;
        this._parentClass = parentClass;
    }
    Card.prototype.render = function () {
        var _this = this;
        var parent = document.querySelector(this._parentClass);
        if (parent) {
            var card_1 = document.createElement('div');
            card_1.classList.add('quiz__card-item');
            card_1.innerHTML = "\n        <div class=\"quiz__card quiz__card-front\">\n          <p class=\"quiz__card-front-text\">\u0412\u043E\u043F\u0440\u043E\u0441 \u043D\u0430:<br/><span class=\"quiz__card-front-value\">".concat(this.points, "</span><br/>\u0431\u0430\u043B\u043B\u043E\u0432</p>\n        </div>\n        <div class=\"quiz__card quiz__card-back\">\n          <div class=\"quiz__card-item-points\">").concat(this.points, "</div>\n          <div class=\"quiz__card-content\">\n            <div class=\"quiz__card-item-question\">").concat(this.question, "</div>\n            <form class=\"quiz__card-item-form\">\n              <input type=\"text\" class=\"quiz__card-item-answer\" placeholder=\"\u0412\u0430\u0448 \u043E\u0442\u0432\u0435\u0442\">\n            </form>\n          </div>\n        </div>\n      ");
            card_1.addEventListener('click', function () { return showCard(card_1); });
            var formEl = card_1.querySelector('.quiz__card-item-form');
            var inputEl_1 = formEl.querySelector('.quiz__card-item-answer');
            formEl.addEventListener('submit', function (e) { return checkAnswer(e, card_1, inputEl_1, _this.answer, _this.points); });
            parent.append(card_1);
        }
    };
    return Card;
}());
fetchQuiz("/db.json");
var totalScore = 0;
var questionsCount = 0;
var currentStep = 1;
var modal = document.querySelector('.modal');
modal.querySelector('.modal__btn').addEventListener('click', function () { return location.reload(); });
var scoreEl = document.querySelector('.quiz__score-value');
scoreEl.innerHTML = "".concat(totalScore);
function fetchQuiz(url) {
    return __awaiter(this, void 0, void 0, function () {
        var res, data, _i, data_1, item, card, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(url)];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    questionsCount = data.length;
                    for (_i = 0, data_1 = data; _i < data_1.length; _i++) {
                        item = data_1[_i];
                        card = new Card(item.points, item.question, item.answer, '.quiz__card-list');
                        card.render();
                    }
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    alert(err_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function checkAnswer(e, cardEl, inputEl, answer, points) {
    e.preventDefault();
    if (inputEl.value.toLowerCase() === answer.toLowerCase()) {
        alert('Правильно!');
        totalScore += points;
        scoreEl.innerHTML = "".concat(totalScore);
    }
    else {
        alert('Неправильно!');
    }
    currentStep++;
    cardEl.style.transform = 'rotateY(0)';
    cardEl.classList.add('quiz__card-item_disabled');
    if (currentStep > questionsCount) {
        modal.classList.add('modal_active');
        console.log(1);
        modal.querySelector('.modal__points').innerText = "".concat(totalScore);
    }
}
function showCard(card) {
    var cardEls = document.querySelectorAll('.quiz__card-item');
    cardEls.forEach(function (item) { return item.style.transform = 'rotateY(0deg)'; });
    card.style.transform = 'rotateY(180deg)';
}
//# sourceMappingURL=script.js.map