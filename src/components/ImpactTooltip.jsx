import React from 'react';
import rulesList from '../data/impact_rules.json';
import { useBudgetStore } from '../hooks/useBudgetStore';
import { t } from '../i18n';

export default function ImpactTooltip() {
  // Pull state
  const { sectors, lang } = useBudgetStore((state) => ({
    sectors: state.sectors,
    lang: state.lang || 'en',
  }));

  // Build consequence messages
  const messages = sectors.flatMap((sec) => {
    const { name, original, value } = sec;
    const rule = rulesList.find((r) => r.sector === name);
    if (!rule) return [];

    const deltaPct = ((value - original) / original) * 100;
    if (Math.abs(deltaPct) < 5) return []; // ignore small tweaks

    const effect = rule.coeff * deltaPct;
    const verb = deltaPct > 0 ? t('increasing', lang) : t('decreasing', lang);
    const impactVerb = effect >= 0 ? t('increase', lang) : t('decrease', lang);
    const icon = effect >= 0 ? '✅' : Math.abs(deltaPct) > 15 ? '❗' : '⚠️';

    const msg = `${verb} ${rule.short || name} ${t('by', lang)} ${Math.abs(deltaPct).toFixed(1)}% ${t('will', lang)} ${impactVerb} ${rule.description} ${t('by', lang)} ${Math.abs(effect).toFixed(1)}${rule.unit}.`;
    return [{ icon, text: msg }];
  });

  if (messages.length === 0) return null;

  return (
    <div className="p-4 bg-white rounded-lg shadow max-h-60 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-2">{t('impactInsights', lang)}</h2>
      <ul className="list-disc list-inside text-sm space-y-1">
        {messages.map((m, i) => (
          <li
            key={i}
            className="flex items-start gap-2"
            style={{ animation: 'fadeIn 0.3s ease' }}
          >
            <span>{m.icon}</span>
            <span>{m.text}</span>
          </li>
        ))}
      </ul>
      <style>{`@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }`}</style>
    </div>
  );
}
