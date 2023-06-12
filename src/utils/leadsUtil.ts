// TODO: Replace with Lead Type once finalized
export function getName (lead: any, withSalutation: boolean = true): string {
  return `${withSalutation ? `${lead.salutation} ` : ''}${lead.first_name} ${lead.last_name}`;
}
