$(document).ready(function(){

  // Função de inicio para carregar os dados vindo so Sheetsu
  function startUp() {
    $.ajax({
        type: "GET",
        url: 'https://sheetsu.com/apis/d12adf03',
        success: processarDadosPlanilha,
        complete: function() {
          $('.loading').fadeOut();
        }
    });
  }

  // Função ajax que será chamada quando os dados forem recebidos do Sheetsu
  // Caso a requisição tenha ocorrido com sucesso, faça:
  function processarDadosPlanilha(data){
      //console.table(data.result); // DEBUG de RESULTADOS
      $linha = "";
      $count = 0;

      jQuery.each(data.result, function(chave, valor) {
        $linha += "<tr class='linha'>";
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
      $('#dados_locais tbody').append( $linha );
  }

  // Função para atualizar os dados da tabela
  // remove dados, exibe o loading e em seguida executa a
  // função startUp()
  function atualizaDados() {
    // remove dados da tabela
    $('#dados_locais tbody tr.linha').each(function() {
      $(this).remove();
    });
    // exibe o loading
    $('.loading').fadeIn();
    // recarrega os dados
    startUp();
  }

  /*
    Inicializa os dados da tabela
  */
  startUp();



  /*
    Validação do Formulário
  */
  $('#form_adicionar').each(function() {

    $('input').blur(function() {
      if($(this).val() == "") {
        $(this).parent().addClass('has-error');
      } else {
        $(this).parent().removeClass('has-error');
      }
    });

    $('select').change(function() {
      if($(this).val() == "") {
        $(this).parent().addClass('has-error');
      } else {
        $(this).parent().removeClass('has-error');
      }
    });

  });

  // Envio do formulário
  $('#btn_submit').on('click', function(event) {
      var $form = $("#form_adicionar");
      var $target = $($form.attr('data-target'));
      var dados_onde    = $('#input_onde').val();
      var dados_local   = $('#input_local').val();
      var dados_bairro  = $('#input_bairro').val()
      var dados_cidade  = $('#input_cidade').val();;
      var dados_estado  = $('#input_estado').val();;
      var dados_wifi    = $('#select_wifi').val();
      var dados_tomadas = $('#select_tomada').val();
      var novaLinha = {
        Onde    : dados_onde,
        Local   : dados_local,
        Bairro  : dados_bairro,
        Cidade  : dados_cidade,
        Estado  : dados_estado,
        Wifi    : dados_wifi,
        Tomadas : dados_tomadas
      };

      $.ajax({
          type: $form.attr('method'),
          url: $form.attr('action'),
          dataType: "json",
          data: $form.serialize(),
          success: processarDadosPlanilha
      });

      // Função ajax que será chamada quando os dados forem recebidos do Sheetsu
      // Caso a requisição tenha ocorrido com sucesso, faça:
      function processarDadosPlanilha(data){
          //console.log('Dados inseridos com sucesso');
          alert('Dados submetidos com sucesso');
          $('#formularioModal').modal('hide');
          //console.dir(novaLinha); // DEBUG TIME!
          atualizaDados();
      }

      event.preventDefault();
  });

});
