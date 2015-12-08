/*
**
**	function:	hm-pre-save.js
**
*/
importPackage(java.io);
importPackage(java.lang.io);
importPackage(java.lang.object);

var outFile = new FileWriter("/polarion/data/logs/main/hm-pre-save.log",true); 
var out = new BufferedWriter(outFile); 


var returnvalue = "";

returnvalue = checkRR();

function checkRR() {

	var countHM = 0;
	
	var linkedWorkItems = workItem.getLinkedWorkItemsDirect();
	for (var i = 0;  i < linkedWorkItems.size(); i++) {
		var linkedWi = linkedWorkItems.get(i);
		
		if (linkedWi.getType().getId().equals('riskRecord')) {
			
			var rrLinkedWorkItems = linkedWi.getLinkedWorkItemsBack();
			
			out.write(linkedWi.getId() + " is contained " +rrLinkedWorkItems.contains(workItem))
			out.newLine();
			if (!rrLinkedWorkItems.contains(workItem)) {
				countHM++;		
				for (var j = 0;  j < rrLinkedWorkItems.size(); j++) {
				
					var wi = rrLinkedWorkItems.get(j);
					out.write("linkedWI - " + wi.getId())
					out.newLine();	
					
					if (wi.getType().getId().equals("hm")) {
						countHM++;
					} 
				}
			}	

			if (countHM > 1) {
				returnvalue = "There may only be one Harm linked to the Risk Record (" +workItem.getId() +").\n\nPlease delete or unmark the invalid linked work item before save.";
			} else {
				returnvalue = null;
			}
			
		}	
	}

	return returnvalue;
}

out.flush();

returnvalue;