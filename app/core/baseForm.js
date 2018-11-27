class BaseForm {
    constructor (app, fileId) {
        this.app = app;
        this.htmlTemplate = this.getTemplate();
        this.app.replaceElement.innerHTML = this.htmlTemplate;
    }

    renderWithModel(model) {
        let formHtml = Mustache.render(this.htmlTemplate, model);
        this.app.replaceElement.innerHTML = formHtml;
    }

    getRenderedHtml(template, model) {
        if (model) {
            return Mustache.render(template, model);
        }

        return template;
    }

    getTemplate() {
        return '<div> Will have content soon </div>';
    }
}