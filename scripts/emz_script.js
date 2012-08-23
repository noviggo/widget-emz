/* ========================================================
 * emz_script.js v1.0.0
 * ========================================================
 * Creado por Guillermo Nuñez
 * Copyright 2012 Noviggo.com All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, are
 * permitted provided that the following conditions are met:
 * 
 *  1. Redistributions of source code must retain the above copyright notice, this list of
 *     conditions and the following disclaimer.
 * 
 *  2. Redistributions in binary form must reproduce the above copyright notice, this list
 *     of conditions and the following disclaimer in the documentation and/or other materials
 *     provided with the distribution.
 * 
 * THIS SOFTWARE IS PROVIDED BY GUILLERMO NUÑEZ ``AS IS'' AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 * FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL GUILLERMO NUÑEZ OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 * 
 * The views and conclusions contained in the software and documentation are those of the
 * authors and should not be interpreted as representing official policies, either expressed
 * or implied, of Guillermo Nuñez.
 * ======================================================== */


var EMZ = function () {
  var
    /* El sitio web */
    baseurl = 'http://www.eventos.mendoza.gov.ar',
    
    /* La reparticion. Valores aceptados:
     * '': Para todos
     * 'Deportes'
     * 'Cultura'
     * 'Turismo'
     */
    reparticion = '',
    classReparticion = '',
    idWidget = 'emz_widget',
    
    /* Cantidad de eventos a traer */
    limit = '3',
    
    /*url de búsqueda de la API */
    apiurl = '/api/v1/evento/buscar/',
    
    /* El elemento donde se creará el widget */
    emzWidget,
    
    /* Objeto encargado de JSONP */
    aObj;

  /*
   * Constructor del sistema de Ajax para JSON
   */
  function JSONscriptRequest (fullUrl) {
      this.fullUrl = fullUrl; 
      this.noCacheIE = '&noCacheIE=' + (new Date()).getTime();
      this.headLoc = document.getElementsByTagName("head").item(0);
      this.scriptId = 'JscriptId' + JSONscriptRequest.scriptCounter++;
  }

  /*
   * Static script ID counter
   */
  JSONscriptRequest.scriptCounter = 1;

  /*
   * buildScriptTag method
   */
  JSONscriptRequest.prototype.buildScriptTag = function () {

      this.scriptObj = document.createElement("script");
      
      this.scriptObj.setAttribute("type", "text/javascript");
      this.scriptObj.setAttribute("charset", "utf-8");
      this.scriptObj.setAttribute("src", this.fullUrl + this.noCacheIE);
      this.scriptObj.setAttribute("id", this.scriptId);
  }
   
  /*
   * removeScriptTag method
   */
  JSONscriptRequest.prototype.removeScriptTag = function () {
      // Destroy the script tag
      this.headLoc.removeChild(this.scriptObj);  
  }

  /*
   * addScriptTag method
   */
  JSONscriptRequest.prototype.addScriptTag = function () {
      // Create the script tag
      this.headLoc.appendChild(this.scriptObj);
  }
  
  /*
   * Transforma mes en número a texto de 3 letras
   */
  function mes(n){

      meses = ["Ene", "Feb", "Mar", "Abr",
              "May", "Jun", "Jul", "Ago",
              "Sep", "Oct", "Nov", "Dic"];

      if(n.charAt(0) == "0"){
          n = parseInt(n.charAt(1), 10);
      }else{
          n = parseInt(n, 10);
      }

      return meses[n - 1];
  }

    /*
     * Para crear fragmentos html para insertar
     */
    function create(htmlStr) {
        var frag = document.createDocumentFragment(),
            temp = document.createElement('div');
        temp.innerHTML = htmlStr;
        while (temp.firstChild) {
            frag.appendChild(temp.firstChild);
        }
        return frag;
    }
  
  /*
   * Función de callback para recibir los datos de JSON
   */
  function callbackfunc (jsonData) {

    var strWidget="";
    strWidget += "<div class=\"emz_wrapper " + classReparticion + "\">";
    strWidget += "  <div class=\"emz_header\">";
    strWidget += "    <span class=\"emz_header_title\">Agenda de Eventos<\/span>";
    strWidget += "  <\/div>";
    strWidget += "  <div class=\"emz_content\">";

    for(var i = 0; i < jsonData.objects.length; i++) {
      var evento = jsonData.objects[i];
      strWidget += "    <div class=\"emz_event\">";
      strWidget += "      <div class=\"emz_title\"><a href=\"" + baseurl + '/evento/' + evento.id + '/' + evento.slug + "\">" + evento.nombre + "<\/a><\/div>";
      strWidget += "      <div class=\"emz_date\">";
      
      fecha_hora = new Date(evento.inicio);
      mes_fecha = fecha_hora.getMonth() + 1;
      
      strWidget += "        <span class=\"emz_day\">" + fecha_hora.getDate() + "<\/span>";
      strWidget += "        <span class=\"emz_month\">" + mes(mes_fecha.toString()) + "<\/span>";
      strWidget += "      <\/div>";
      strWidget += "      <div class=\"emz_event_desc\">";
      strWidget += "        <p>" + evento.copete + "<\/p>";
      strWidget += "      <\/div>";
      strWidget += "      <div class=\"emz_event_actions\">";
      strWidget += "        <a href=\"" + baseurl + '/evento/' + evento.id + '/' + evento.slug + "\" class=\"emz_moreinfo\">Ver info completa +<\/a>";
      strWidget += "      <\/div>";
      strWidget += "    <\/div>";
    }
    strWidget += "    <div class=\"emz_buttons\">";
    strWidget += "      <a href=\""+ baseurl + "\" class=\"emz_moreinfo\">Ver m&aacute;s eventos<\/a>";
    strWidget += "    <\/div>";
    strWidget += "  <\/div>";
    strWidget += "  <div class=\"emz_footer\">";
    strWidget += "    <div class=\"emz_brand " + classReparticion + "\"><\/div>";
    strWidget += "  <\/div>";
    strWidget += "<\/div>";

    var fragment = create(strWidget);
    emzWidget.replaceChild(fragment, emzWidget.childNodes[0]);

    aObj.removeScriptTag();
  }

  function start() {
    var url = baseurl + apiurl + "?q=" + reparticion + "&limit=" + limit + "&format=jsonp&callback=EMZ.callbackfunc";
    emzWidget = document.getElementById(idWidget);

    /* Crear mensaje de "Cargando" */
    var strWidget="";
    strWidget += "<div class=\"emz_wrapper " + classReparticion + "\">";
    strWidget += "  <div class=\"emz_header\">";
    strWidget += "    <span class=\"emz_header_title\">Agenda de Eventos<\/span>";
    strWidget += "  <\/div>";
    strWidget += "  <div class=\"emz_content\">";

    strWidget += "  Cargando eventos ...";

    strWidget += "    <div class=\"emz_buttons\">";
    strWidget += "      <a href=\""+ baseurl + "\" class=\"emz_moreinfo\">Ver m&aacute;s eventos<\/a>";
    strWidget += "    <\/div>";
    strWidget += "  <\/div>";
    strWidget += "  <div class=\"emz_footer\">";
    strWidget += "    <div class=\"emz_brand " + classReparticion + "\"><\/div>";
    strWidget += "  <\/div>";
    strWidget += "<\/div>";

    
    var fragment = create(strWidget);
    emzWidget.appendChild(fragment);
    
    aObj = new JSONscriptRequest(url);
    aObj.buildScriptTag();
    aObj.addScriptTag();
    
  }
  
  function init (args) {
    if (args.reparticion) {
        reparticion = args.reparticion;
    }
    if (args.idWidget) {
        idWidget = args.idWidget;
    }
    if (args.limite) {
        limit = args.limite;
    }
   
    switch (reparticion) {
        case 'Deportes':
            classReparticion = 'emz_deportes';
            break;
        case 'Cultura':
            classReparticion = 'emz_cultura';
            break;
        case 'Turismo':
            classReparticion = 'emz_turismo';
            break;
        default: 
            classReparticion = '';
            break;
    }
    
    
    (function(i) {var u =navigator.userAgent;var e=/*@cc_on!@*/false; var st = 
    setTimeout;if(/webkit/i.test(u)){st(function(){var dr=document.readyState;
    if(dr=="loaded"||dr=="complete"){i()}else{st(arguments.callee,10);}},10);}
    else if((/mozilla/i.test(u)&&!/(compati)/.test(u)) || (/opera/i.test(u))){
    document.addEventListener("DOMContentLoaded",i,false); } else if(e){     (
    function(){var t=document.createElement('doc:rdy');try{t.doScroll('left');
    i();t=null;}catch(e){st(arguments.callee,0);}})();}else{window.onload=i;}})(start);

  }
  return {
    init:init,
    start:start,
    callbackfunc:callbackfunc
  }
}();


