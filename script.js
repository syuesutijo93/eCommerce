$(document).ready(function() {
  $.ajax({
    type: "GET",
    url: "products.xml",
    dataType: "xml",
    success: function(xml) {
      $(xml).find('product').each(function() {
        var id = $(this).find('id').text();
        var name = $(this).find('name').text();
        var price = $(this).find('price').text();
        var image = $(this).find('image').text();
        var description = $(this).find('description').text();

        var html = '<div class="product">';
        html += '<img src="' + image + '" alt="' + name + '">';
        html += '<h3>' + name + '</h3>';
        html += '<p>Price: $' + price + '</p>';
        html += '<p>' + description + '</p>';
        html += '</div>';

        $('#products').append(html);
      });
    }
  });
});
