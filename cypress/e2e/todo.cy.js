describe("1 - Crear tarea", () => {
  it("Agregar una tarea a la lista", () => {
    cy.visit("https://todomvc.com/examples/react/dist/#/"); // Visitamos la URL de la app

    cy.get(".new-todo").type("Tarea 1{enter}"); //

    cy.get(".todo-list li")
      .should("have.length", 1)
      .first()
      .should("contain.text", "Tarea 1"); // Verificar que la tarea se ha creado
  });
});

describe("2 - Marcar tarea como completada", () => {
  it("Cambiar estado de la tarea a completada", () => {
    cy.visit("https://todomvc.com/examples/react/dist/#/");
    cy.get(".new-todo").type("Tarea a completar{enter}"); // Agregar una tarea
    cy.get(".todo-list li") // Seleccionar la tarea agregada
      .first()
      .find(".toggle") // Buscar el botón de verificación
      .click(); // Hacer clic para marcar como completada
    cy.get(".todo-list li").first().should("have.class", "completed"); // Verificar que la tarea esté marcada como completada
  });
});

describe("3 - Desmarcar tarea como completada", () => {
  it("Cambiar estado de la tarea a pendiente", () => {
    cy.visit("https://todomvc.com/examples/react/dist/#/");
    cy.get(".new-todo").type("Tarea a desmarcar{enter}");
    cy.get(".todo-list li").first().find(".toggle").click(); // Marcar tarea como completada
    cy.get(".todo-list li").first().find(".toggle").click(); // Desmarcar tarea
    cy.get(".todo-list li").first().should("not.have.class", "completed"); // Verificar que la tarea ya no está completada
  });
});

describe("4 - Editar tarea", () => {
  it("Editar una tarea de la lista", () => {
    cy.visit("https://todomvc.com/examples/react/dist/#/");
    cy.get(".new-todo").type("Tarea editable{enter}"); // Agregar una tarea
    cy.get(".todo-list li").first().dblclick(); // Hacer doble clic sobre la tarea para editar
    cy.get(".todo-list li")
      .first()
      .find("input") // Buscar el campo de entrada para editar
      .clear()
      .type("Tarea editada{enter}"); // Borrar y escribir el nuevo texto
    cy.get(".todo-list li")
      .first() // Verificar que la tarea se haya editado
      .should("contain.text", "Tarea editada");
  });
});

describe("5 - Borrar tarea", () => {
  it("Borrar una tarea", () => {
    cy.visit("https://todomvc.com/examples/react/dist/#/");
    cy.get(".new-todo").type("Tarea a borrar{enter}"); // Agregar una tarea
    cy.get(".todo-list li")
      .first()
      .find(".destroy") // Buscar el botón de eliminar
      .click({ force: true }); // Eliminar la tarea (force es necesario para hacer clic en elementos ocultos)
    cy.get(".todo-list li") // Verificar que la tarea haya sido eliminada
      .should("have.length", 0);
  });
});

describe("6 - Filtrar tareas", () => {
  it("Filtrar tareas alternando entre All, Active, Completed", () => {
    cy.visit("https://todomvc.com/examples/react/dist/#/");

    // Agregar tareas con diferentes estados
    cy.get(".new-todo").type("Tarea 1{enter}"); // Agregar la primera tarea
    cy.get(".new-todo").type("Tarea 2{enter}"); // Agregar la segunda tarea
    cy.get(".todo-list li").first().find(".toggle").click(); // Marcar la primera tarea como completada

    // Verificar que todas las tareas se muestran al inicio (All)
    cy.get(".filters").contains("All").click(); // Hacer clic en el botón "All"
    cy.get(".todo-list li").should("have.length", 2); // Verificar que se muestren las 2 tareas

    // Filtrar tareas activas (Active)
    cy.get(".filters").contains("Active").click(); // Hacer clic en el botón "Active"
    cy.get(".todo-list li").should("have.length", 1); // Verificar que solo haya 1 tarea no completada
    cy.get(".todo-list li").first().should("contain.text", "Tarea 2"); // Verificar que es "Tarea 2"

    // Filtrar tareas completadas (Completed)
    cy.get(".filters").contains("Completed").click(); // Hacer clic en el botón "Completed"
    cy.get(".todo-list li").should("have.length", 1); // Verificar que solo haya 1 tarea completada
    cy.get(".todo-list li").first().should("contain.text", "Tarea 1"); // Verificar que es "Tarea 1"

    // Volver a mostrar todas las tareas (All)
    cy.get(".filters").contains("All").click(); // Hacer clic en el botón "All"
    cy.get(".todo-list li").should("have.length", 2); // Verificar que se muestran las 2 tareas
  });
});