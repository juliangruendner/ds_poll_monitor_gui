npm run env -s && ng build --prod --base-href=/poll-monitor/
rm poll_gui.zip
zip -r poll_gui.zip dist/
cp poll_gui.zip ../ds_poll_monitor_server/poll_gui.zip
