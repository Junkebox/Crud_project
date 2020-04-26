
$(document).ready(function () {
    // inserting content into table
    var trElement, tdElement;

    contents.forEach(function(item) {

        trElement = $("<tr id='"+item._id+"'>"+"</tr>");
        tdElement = $("<td></td>").text(item.title);
        trElement.append(tdElement);

        tdElement = $("<td></td>").text(item.artist);
        trElement.append(tdElement);

        tdElement = $("<td></td>").text(item.country);
        trElement.append(tdElement);

        tdElement = $("<td></td>").text(item.label);
        trElement.append(tdElement);

        tdElement = $("<td></td>").text(item.year);
        trElement.append(tdElement);

        tdElement = $("<td></td>").html("<a href='/delete/"+item._id+"?studioname=1'>" +"<img src='img/delete.jpg'></a>"+"<span style='display:inline-block; width: 15px;'></span><a href='/update/"+item._id+"?studioname=1'>" +"<img src='img/edit.png'></a>");
        trElement.append(tdElement);

        $('#cd-list1').append(trElement);
    });
    contents.RemixAlbum.forEach(function(item) {
        trElement = $("<tr></tr>");
        tdElement = $("<td></td>").text(item.title);
        trElement.append(tdElement);

        trElement = $("<tr></tr>");
        tdElement = $("<td></td>").text(item.title);
        trElement.append(tdElement);

        tdElement = $("<td></td>").text(item.artist);
        trElement.append(tdElement);

        tdElement = $("<td></td>").text(item.country);
        trElement.append(tdElement);

        tdElement = $("<td></td>").text(item.label);
        trElement.append(tdElement);

        tdElement = $("<td></td>").text(item.year);
        trElement.append(tdElement);

        tdElement = $("<td></td>").html("<a href='/delete/"+item.title+"?studioname=2'>" +"<img src='img/delete.jpg'></a>"+"<span style='display:inline-block; width: 15px;'></span><a href='/update/"+item.title+"?studioname=2'>" +"<img src='img/edit.png'></a>");
        trElement.append(tdElement);

        $('#cd-list2').append(trElement);
    });
    //add attribute to link to recognize which studio you are using
    $('#album').on('click',function(){
        $('#addlink').attr("href","/add?studioname='1'");
    });
    
    $('#remixs').on('click',function(){
        $('#addlink').attr("href","/add?studioname='2'");
    });
    
});