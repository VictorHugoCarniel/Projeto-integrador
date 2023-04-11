var pedidos = JSON.parse(document.currentScript.getAttribute('data-itens-carrinho'));
console.log(pedidos)
var total = 0;
for (var i = 0; i < pedidos.length; i++) {
    var pedido = pedidos[i];
    var subtotal = pedido.preco * pedido.quantidade;
    total += subtotal;
    document.write("<tr>");
    document.write("<td>" + (i+1) + "</td>");
    document.write("<td>" + pedido.nome + "</td>");
    document.write("<td>R$" + pedido.preco + "</td>");
    document.write("<td>" + pedido.quantidade + "</td>");
    document.write("<td>R$" + subtotal + "</td>");
    document.write("</tr>");
}
document.write("<tfoot>");
document.write("<tr>");
document.write("<td colspan='4'>Total:</td>");
document.write("<td>R$" + total + "</td>");
document.write("</tr>");
document.write("</tfoot>");
document.write("</tbody>");
document.write("</table>");
document.write("<div class='informacoes-adicionais'>");
document.write("<p><strong>Nome da cantina:</strong> Senac</p>");
document.write("<p><strong>Data:</strong> " + new Date().toLocaleDateString() + "</p>");
document.write("<p><strong>Hora:</strong> " + new Date().toLocaleTimeString() + "</p>");
document.write("</div>");