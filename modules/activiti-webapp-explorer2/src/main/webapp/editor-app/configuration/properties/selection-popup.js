var jsonString = angular.element(document.getElementById('textarea')).scope().getPropertyValue();
var jsonObject;

if (jsonString) {
    try {
        jsonObject = JSON.parse(jsonString);

    } catch (e) {
        console.error(e);
        jsonObject = null;
    }
} else {
    jsonObject = null;
}

var inputName;
var outputName;
if (jsonObject) {
    inputName = jsonObject.inputName;
    if (inputName) {
        jQuery("#inputVariableName").val(inputName);
    }
    outputName = jsonObject.outputName;
    if (outputName) {
        jQuery("#outputVariableName").val(outputName);
    }
}

jQuery("#inTable").find("tr").not(':first').click(function () {
    jQuery(this).addClass('selected').siblings().removeClass('selected');
});

var nodes = CubaStencilUtils.getAvailableVariablesForSelectedShape();
var inputParams = angular.element(document.getElementById('textarea')).scope().inputParameters;
var outputParams = angular.element(document.getElementById('textarea')).scope().outputParameters;
var typeList = ["Integer", "Double", "String", "Boolean", "BigDecimal", "Date", "Time", "DateTime", "Map", "Set", "List"];

fillInTable();

function fillInTable() {
    //nodes = node id and variables from prev nodes
    //input params = process input params

    if (!nodes.length && !inputParams.length && !outputParams.length) {
        jQuery("#inputVariablesWrapper").hide();
    } else {
        jQuery("#inputVariablesWrapper").show();

        for (var i = 0; i < inputParams.length; i++) {
            if (!inputParams[i].valueStr) {
                inputParams[i].valueStr = ''
            }
            jQuery("#inTable").append('<tr><td>' + inputParams[i].name + '</td><td>' + inputParams[i].parameterType + '<td>' + '</td></tr>')
        }

        for (var j = 0; j < outputParams.length; j++) {
            if (!outputParams[j].valueStr) {
                outputParams[j].valueStr = ''
            }
            jQuery("#inTable").append('<tr><td>' + outputParams[j].name + '</td><td>' + outputParams[j].parameterType + '<td>' + '</td></tr>')
        }

        for (var k = 0; k < nodes.length; k++) {
            var node = nodes[k];
            var vars = node.vars;
            for (var y = 0; y < vars.length; y++) {
                jQuery("#inTable").append('<tr><td>' + nodes[k].vars[y].name + '</td><td>' + nodes[k].vars[y].type + '</td>' + '<td>' + nodes[k].vars[y].description + '</td></tr>')
            }
        }
    }
}

document.getElementById('inputVariableName').addEventListener("input", function (evt) {
    changeJson();
});

document.getElementById('outputVariableName').addEventListener("input", function (evt) {
    changeJson();
});


function changeJson() {
    inputName = jQuery("#inputVariableName").val();
    outputName = jQuery("#outputVariableName").val();
    alert(inputName + outputName);
    document.getElementById("textarea").value = "{" + "\"inputName\":" + inputName + ", " +
        "\"outputName\":" + outputName + "}";
    jQuery("#textarea").change();
}
