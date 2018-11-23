class App {
    constructor(nodeName) {
        this.rootName = nodeName;
        this.dbName = this.rootName + 'DB';
        this.init();
    }

    initDB() {
        const articleDB = window.localStorage.getItem(this.dbName);
        const db = articleDB ? JSON.parse(articleDB) : seedArticles;
        this.articles = JSON.parse(JSON.stringify(db))
    }

    saveDB() {
        window.localStorage.setItem(this.dbName, JSON.stringify(this.articles));
    }

    init() {
        this.initDB();
        this.rootNode = document.querySelector("#" + this.rootName);
        this.replaceElement = this.getElement('main-content');

        this.initHomeButton();
        this.switchToListScreen();
    }

    getElement(className) {
        const elements = this.rootNode.getElementsByClassName(className);

        if (elements && elements.length > 0) {
            return elements[0];
        }

        return undefined;
    }

    switchToListScreen() {
        const listForm = new ListForm(this, '#list-file');
        listForm.init(this.articles);
    }

    switchToEditScreen(article) {
        const editForm = new EditForm(this, '#edit-file');
        editForm.init(this.articles, article);
    }

    switchToCreateScreen() {
        const createForm = new CreateForm(this, '#create-file');
        createForm.init(this.articles);
    }

    switchToViewScreen(article) {
        const viewForm = new ViewForm(this, '#view-file');
        viewForm.init(article);
    }

    initHomeButton() {
      const homeBtn = this.rootNode.querySelector('.home-btn');

      const self = this;
      homeBtn.addEventListener('click', function() {
        self.switchToListScreen();
      });
    }
}

const app = new App('main');
const app2 = new App('main2');

window.onbeforeunload = function () {
    app.saveDB();
    app2.saveDB();
};