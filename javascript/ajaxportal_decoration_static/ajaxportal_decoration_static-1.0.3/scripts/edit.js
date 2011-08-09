///////////////////////////////////////////////////////////////////
// AJAX Portal                                                   //
// Copyright Sergei Sokolov, Belarus, Minsk, 2005..2011          //
// Version 1.0.3 Alpha4 (28 Jan 2011)                            //
///////////////////////////////////////////////////////////////////

/** 
 * @fileoverview This file is to be used in AJAX Portal. 
 *
 * @author Sergei Sokolov s-sokolov@tut.by
 * @version 1.0.3
 */

/*
function newPortlet() {
    var regionCombobox = $("regions");
    for (var i = 0; i < regionCombobox.options.length; i++) {
        if (regionCombobox.options[i].selected) {
            var id = regionCombobox.options[i].value;
            var portletRegion = portal.getPortletRegionById(id);
            if (portletRegion) {

                var portletId = "portlet" + generateId();
                com.sokolov.portal.Portlet.createContentArea(portletId, portletRegion.getId());
                var portlet = new com.sokolov.portal.Portlet(portletId, "New", portletRegion.getId());
                portlet.init();
                portletRegion.portlets[portletRegion.portlets.length] = portlet;

                portletRegion.refresh();

                $("pTitle").value = portlet.getTitle();
                setSelectedItem("portletState", com.sokolov.portal.Portlet.STATE_NORMAL);
                $("portletMove").checked = false;
                $("portletEdit").checked = false;
                $("portletHelp").checked = false;
                $("portletSave").disabled = false;
                $("portletCancel").disabled = false;

                var portletCombobox = $("portlets");
                var option = document.createElement("OPTION");
                option.text = portlet.getTitle();
                option.value = portlet.getId();
                option.selected = true;
                portletCombobox.options.add(option); 

            }
        }
    }
}
*/



function showEditPortlet(id) {
            var portlet = portal.getPortletById(id);
            if (portlet) {
                $("pTitle").value = portlet.getTitle();
                setSelectedItem("portletState", portlet.getState());
                $("portletMove").checked = portlet.isDraggable();
                $("portletEdit").checked = portlet.hasEditButton();
                $("portletHelp").checked = portlet.hasHelpButton();
                $("pHelpUrl").value = portlet.getHelpUrl();
                $("pUrl").value = portlet.getUrl();

                $("portletSave").disabled = false;
                $("portletCancel").disabled = false;
            }
}

function saveEditPortlet(id) {
            var portlet = portal.getPortletById(id);
            if (portlet) {
                portlet.setTitle($("pTitle").value);
                portlet.setState(getSelectedItem("portletState"));
                portlet.setDraggable($("portletMove").checked);
                portlet.setEditButton($("portletEdit").checked);
                portlet.setHelpButton($("portletHelp").checked);
                portlet.setHelpUrl($("pHelpUrl").value);

                portlet.setUrl($("pUrl").value);
            }
}

function showPotletContent(id) {
            var portlet = portal.getPortletById(id);
            if (portlet) {
                $("portletContent").value = portlet.getHtmlContent();
            }
}

function setPotletContent(id) {
            var portlet = portal.getPortletById(id);
            if (portlet) {
                var content = $("portletContent").value;
                portlet.setHtmlContent(content);
            }
}


function showEditDialog(id) {

    var obj = $("portletEditDialog");
    if (obj) {
        return;
    }

    var div = document.createElement("DIV");
    div.id = "portletEditDialog";
    document.body.insertBefore(div, document.body.firstChild)

    var html = 
//    "<table class='main'>"+
//    "<tr><td>"+
//    "<div id='main' class='window' title='Portlet' style='width: 100%;'>"+

    //"<div id='portletEditDialog' class='portlet dialog noBehaviourButton' title='Portlet' style='margin: 0;'>"+

    "<form name='frm' style='margin:0;padding:0;'>"+

    "<table class='layout'>"+


    // portlet list
    "<tr>"+


    // portlet title
    "<td class='caption' style='width: 120px;'>Title:</td><td><input id='pTitle' name='pTitle' class='editbox' value=''></td></tr>"+

    // portlet state
    "<tr><td>State:</td><td><select id='portletState' name='portletState' style='width: 150px;'>"+
    "<option name='state0' value='"+ com.sokolov.portal.Portlet.STATE_MINIMIZED +"'>Minimazed</option>"+
    "<option name='state1' value='"+ com.sokolov.portal.Portlet.STATE_NORMAL +"'>Normal</option>"+
    "<option name='state1' value='"+ com.sokolov.portal.Portlet.STATE_HIDDEN +"'>Hidden</option>"+
    "</select></td></tr>"+


    "<tr><td>Content URL:</td><td><input id='pUrl' name='pUrl' class='editbox' value=''></td></tr>"+

    // portlet Drag&Drop
    "<tr><td>&nbsp;</td><td><input id='portletMove' name='portletMove' type='checkbox' value='move'>Support Drag&Drop</td></tr>"+
    // portlet edit
    "<tr><td>&nbsp;</td><td><input id='portletEdit' name='portletEdit' type='checkbox' value='edit'>Has Edit page</td></tr>"+
    // portlet help
    "<tr><td>&nbsp;</td><td><input id='portletHelp' name='portletHelp' type='checkbox' value='help'>Has Help page</td></tr>"+
    "<tr><td>Help page URL:</td><td><input id='pHelpUrl' name='pHelpUrl' class='editbox' value=''></td></tr>"+

    "<tr><td>&nbsp;</td><td><input id='portletSave' name='portletSave' type='button' value='Save' onclick='saveEditPortlet(\""+id+"\");closeEditDialog();'>"+
    "<input id='portletCancel' name='portletCancel' type='button' value='Cancel' onclick='closeEditDialog();'>"+
    "<input id='portletApply' name='portletApply' type='button' value='Apply' onclick='saveEditPortlet(\""+id+"\");'></td></tr>"+

    "</table>"+

    "<textarea id='portletContent' cols='50' rows='7'></textarea><br>"+
    "<input id='portletApply' name='portletApply' type='button' value='Set Content' onclick='setPotletContent(\""+id+"\");'>"+

    "</form>";

    //"</div>"


    /***********************************************************************************************************/

//    "</div></td></tr>"+
//    "</table>"+


    obj = $("portletEditDialog");

    obj.className='portlet dialog noBehaviourButton';
    //obj.setAttribute("class", "portlet dialog noBehaviourButton");
    obj.title='Portlet';
    obj.cssText='margin: 0;';

    obj.innerHTML = html;




    if (navigator.appName == 'Microsoft Internet Explorer') {
        obj.style.display = "block";
        obj.style.zIndex = 2000000000;
        obj.style.position = "absolute";
        obj.style.top = "110px";
        obj.style.left = "150px";
        obj.style.background = "#DDDDDD";
        obj.style.border = "1px silver solid";
    } else {
        obj.setAttribute("style", "z-index: 2000000000; position: fixed; display: block; top: 110px; left: 150px; background: white; border: 1px silver solid;");
    }


    var portlet2 = $("portletEditDialog");
    com.sokolov.portal.Portlet.decorateContentArea(portlet2.id, portlet2.title, portlet2.iconUri);

    showEditPortlet(id);
    showPotletContent(id);

    definedAsDraggable($("portletEditDialog"));
}

function closeEditDialog() {
    var obj = $("portletEditDialog");
    document.body.removeChild(obj);
}