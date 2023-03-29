// function showLoader() {
//     const div = document.createElement("div");
//     div.classList.add("loading");

//     document.body.appendChild(div);
// }

// function hideLoader() {

// }

// $(document).ready(function () {
//     $('#filter-button').click(function () {
//         var filter = $('#filter').val().toLowerCase();
//         $('table tbody tr').filter(function () {
//             $(this).toggle($(this).text().toLowerCase().indexOf(filter) > -1)
//         });
//     });
//     setupPagination(table, 15);
// });

// $(document).ready(function() {
//     // Armazena a tabela em uma variável
//     var table = $('table');

//     // Adiciona um evento de clique no botão "Filtrar"
//     $('.filter-group button[type="submit"]').click(function(e) {
//       e.preventDefault();

//       // Obtém os valores dos filtros de entrada
//       var filterId = $('#filter-id').val().toLowerCase();
//       var filterProduct = $('#filter-product').val().toLowerCase();
//       var filterClient = $('#filter-client').val().toLowerCase();
//       var filterPrice = $('#filter-price').val().toLowerCase();
//       var filterQuantity = $('#filter-quantity').val().toLowerCase();
//       var filterDate = $('#filter-date').val().toLowerCase();

//       // Filtra os dados da tabela com base nos valores de entrada
//       table.find('tr').not(':first').each(function(index, row) {
//         var rowData = $(row).find('td');
//         var id = rowData.eq(0).text().toLowerCase();
//         var product = rowData.eq(1).text().toLowerCase();
//         var client = rowData.eq(2).text().toLowerCase();
//         var price = rowData.eq(3).text().toLowerCase();
//         var quantity = rowData.eq(4).text().toLowerCase();
//         var date = rowData.eq(5).text().toLowerCase();

//         if (id.indexOf(filterId) > -1 &&
//             product.indexOf(filterProduct) > -1 &&
//             client.indexOf(filterClient) > -1 &&
//             price.indexOf(filterPrice) > -1 &&
//             quantity.indexOf(filterQuantity) > -1 &&
//             date.indexOf(filterDate) > -1) {
//           $(row).show();
//         } else {
//           $(row).hide();
//         }
//       });
//     });
//     setupPagination(table, 15);
//   });





const table = document.querySelector("table");
setupPagination(table, 15);

function setupPagination(table, rowsPerPage) {
    const tableBody = table.tBodies[0];
    const tableRows = Array.from(tableBody.rows);

    let currentPage = 1;
    let totalPages = Math.ceil(tableRows.length / rowsPerPage);

    function showPage(page) {
        if (page < 1 || page > totalPages) return;

        tableBody.innerHTML = "";

        let start = (page - 1) * rowsPerPage;
        let end = start + rowsPerPage;

        let rowsToShow = tableRows.slice(start, end);

        rowsToShow.forEach(row => {
            tableBody.appendChild(row);
        });

        currentPage = page;

        updatePaginationLinks();
    }

    function updatePaginationLinks() {
        const prevLink = document.querySelector(".pagination .prev");
        const nextLink = document.querySelector(".pagination .next");
        const pageLinks = document.querySelectorAll(".pagination .page");

        pageLinks.forEach(link => {
            link.classList.remove("active");
            if (link.textContent == currentPage) {
                link.classList.add("active");
            }
        });

        if (currentPage == 1) {
            prevLink.classList.add("disabled");
        } else {
            prevLink.classList.remove("disabled");
        }

        if (currentPage == totalPages) {
            nextLink.classList.add("disabled");
        } else {
            nextLink.classList.remove("disabled");
        }

        // define o número máximo de links de página a serem exibidos
        const maxLinks = 3;

        // ajusta o início e o fim do intervalo de links de página exibidos
        let startPage = currentPage - Math.floor(maxLinks / 2);
        let endPage = currentPage + Math.floor(maxLinks / 2);

        if (startPage < 1) {
            endPage += Math.abs(startPage) + 1;
            startPage = 1;
        }

        if (endPage > totalPages) {
            startPage -= endPage - totalPages;
            endPage = totalPages;
        }

        // atualiza o texto e o link dos links de página exibidos
        let j = 0;
        for (let i = startPage; i <= endPage; i++) {
            if (i < 1) continue; // adiciona esta condição para pular índices menores do que 1
            let pageLink = pageLinks[j];
            pageLink.textContent = i;
            pageLink.href = "#";
            if (i == currentPage) {
                pageLink.classList.add("active");
            } else {
                pageLink.classList.remove("active");
            }
            j++;
        }


        // Esconde os links de página excedentes
        for (let i = j; i < maxLinks; i++) {
            pageLinks[i].style.display = "none";
        }

        // Oculta a lista de links de página caso não haja mais páginas a serem exibidas
        if (startPage === 1 && endPage === totalPages) {
            document.querySelector(".pagination").style.display = "none";
        } else {
            document.querySelector(".pagination").style.display = "flex";
        }
    }



    function setupPaginationLinks() {
        const prevLink = document.querySelector(".pagination .prev");
        const nextLink = document.querySelector(".pagination .next");
        const pageLinks = document.querySelectorAll(".pagination .page");

        prevLink.addEventListener("click", () => {
            if (currentPage >= 2) showPage(currentPage - 1);
        });

        nextLink.addEventListener("click", () => {
            if (currentPage < totalPages) showPage(currentPage + 1);
        });

        pageLinks.forEach(link => {
            link.addEventListener("click", () => {
                showPage(parseInt(link.textContent));
            });
        });

    }

    showPage(currentPage);
    setupPaginationLinks();
}