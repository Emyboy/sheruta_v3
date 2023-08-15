import React from 'react';

const SalesIQWidget = () => (
  <div>
    <script
      type="text/javascript"
      dangerouslySetInnerHTML={{
        __html: `
          var $zoho=$zoho || {};$zoho.salesiq = $zoho.salesiq || {widgetcode: "siq76e6701d001b56057d3a56e5b16c71384151e02942d8c7e40c8c5a1a5a444578", values:{},ready:function(){}};
          var d=document;s=d.createElement("script");s.type="text/javascript";s.id="zsiqscript";s.defer=true;s.src="https://salesiq.zohopublic.com/widget";t=d.getElementsByTagName("script")[0];t.parentNode.insertBefore(s,t);
        `,
      }}
    />
    <div id="zsiqwidget" />
  </div>
);

export default SalesIQWidget;
