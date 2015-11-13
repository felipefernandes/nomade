$(document).ready(function(){

  $.ajax({
      type: "GET",
      url: 'https://sheetsu.com/apis/d12adf03',
      success: processarDadosPlanilha
  });
  // Função ajax que será chamada quando os dados forem recebidos do Sheetsu
  // Caso a requisição tenha ocorrido com sucesso, faça:
  function processarDadosPlanilha(data){
      //console.table(data.result); // DEBUG de RESULTADOS
      $linha = "";
      $count = 0;

      jQuery.each(data.result, function(chave, valor) {
        $linha += "<tr>";
        $.each(valor, function(chave_interna, valor_interna) {
          //console.log( chave_interna + " : " + valor_interna);
          if ((chave_interna == "Onde")   ||
              (chave_interna == "Local")  ||
              (chave_interna == "Bairro") ||
              (chave_interna == "Wifi")   ||
              (chave_interna == "Tomada"))
              {
                $linha += "<td>" + valor_interna + "</td>";
          }
        });
        $linha += "</tr>"
      });      

      //$linha = "<td colspan='5'>Olá</td>";


      $('#dados_locais tbody').append( $linha );




  }






  $('#form_adicionar #enviar').click(function() {

    var formDataOK = false;

    // Verificar se todos os dados foram processados
    if($('#input_onde').value() == "") {
      alert('Onde vazio');
    }



    // monta a variavel para ser postada para Sheetsu
    var novaLinha = {
        ideia: 'INSIRA AQUI SUA IDEIA',
        categoria: 'exemplo'
    };

    if ( formDataOK ) {
      $.ajax({
          type: "POST",
          url: 'https://sheetsu.com/apis/d12adf03',
          data: novaLinha,
          success: processarDadosPlanilha
      });
    }

    // Função ajax que será chamada quando os dados forem recebidos do Sheetsu
    // Caso a requisição tenha ocorrido com sucesso, faça:
    function processarDadosPlanilha(data){
        console.log('Dados inseridos com sucesso');
    }

  });



});

/*

*/
