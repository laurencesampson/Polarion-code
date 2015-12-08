/*
**
**	function:	hs-pre-save.js
**
*/
importPackage(java.io);
importPackage(java.lang.io);
importPackage(java.lang.object);

var outFile = new FileWriter("/polarion/data/logs/main/hs-pre-save.log",true); 
var out = new BufferedWriter(outFile); 


var returnvalue = "";

returnvalue = checkRR();

function checkRR() {

	var countHS = 0;
	
	var linkedWorkItems = workItem.getLinkedWorkItemsDirect();
	for (var i = 0;  i < linkedWorkItems.size(); i++) {
		var linkedWi = linkedWorkItems.get(i);
		
		if (linkedWi.getType().getId().equals('riskRecord')) {
			
			var rrLinkedWorkItems = linkedWi.getLinkedWorkItemsBack();
			
			out.write("contains " +rrLinkedWorkItems.contains(workItem))
			out.newLine();
			if (!rrLinkedWorkItems.contains(workItem)) {
				countHS++;		
				for (var j = 0;  j < rrLinkedWorkItems.size(); j++) {
				
					var wi = rrLinkedWorkItems.get(j);
					out.newLine();	
					
					if (wi.getType().getId().equals("hs")) {
						countHS++;
					} 
				}
			}	

			if (countHS > 1) {
				returnvalue = "There may only be one Hazardous Situation linked to the Risk Record.\n\nPlease delete or unmark the invalid linked work item before save.";
			} else {
				returnvalue = null;
			}
			
		}	
	}

	return returnvalue;
}

out.flush();

returnvalue;