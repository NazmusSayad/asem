If WScript.Arguments.Count = 0 Then
    WScript.Echo "Usage: script.vbs <avd_name>"
    WScript.Quit
End If

avdName = WScript.Arguments(0)

Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "cmd /c emulator -avd " & avdName, 0, False
