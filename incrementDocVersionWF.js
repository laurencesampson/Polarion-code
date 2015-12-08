{\rtf1\ansi\ansicpg1252\cocoartf1348\cocoasubrtf170
{\fonttbl\f0\fmodern\fcharset0 Courier;}
{\colortbl;\red255\green255\blue255;}
\margl1440\margr1440\vieww10800\viewh8400\viewkind0
\deftab720
\pard\pardeftab720

\f0\fs26 \cf0 \expnd0\expndtw0\kerning0
/*\
	incrementDocVersionWF.js\
	\
	Jean-Fran\'c3\'a7ois Thibeault\
	\
	This workflow function increments a document version (Custom Field: version)\
	The increment is: 1.0\
	\
	Format of version field after the increment: x.0\
	\
	The document must have a custom field of textual type with id: "version"\
	\
	Note that no error will be generated if no custom fields with id "version" exists. \
\
*/\
\
\
importPackage(java.io);\
importPackage(java.text);\
importPackage(java.lang);\
importPackage(java.lang.io);\
importPackage(java.lang.object);\
importPackage(java.util);\
importPackage(com.polarion.platform);\
importPackage(com.polarion.platform.core);\
importPackage(com.polarion.platform.context);\
importPackage(com.polarion.platform.jobs);\
\
\
var outFile = new FileWriter("./logs/main/incrementDocVersionWF.log"); \
var out = new BufferedWriter(outFile); \
\
var doc_workitem = workflowContext.getTarget();\
var iProject = doc_workitem.getProject();\
var projectId = doc_workitem.getProjectId();\
var oldVersion = doc_workitem.getCustomField("version");\
var newVersion = "";\
\
out.write("Values:"); out.newLine(); \
out.write("Old Version: " + oldVersion); out.newLine();\
\
if (oldVersion == "" || oldVersion == null || oldVersion == "NaN")\
\{\
    newVersion = "1.0";\
    doc_workitem.setCustomField("version", newVersion);\
    out.write("New Version: " + newVersion); out.newLine();\
\}\
else\
\{\
    newVersion = parseFloat(oldVersion) + 1.0;\
    doc_workitem.setCustomField("version",newVersion.toFixed(1).toString());\
    out.write("New Version: " + newVersion.toFixed(1).toString()); out.newLine();\
\}\
\
\
out.flush();\
\
out.close();\
}