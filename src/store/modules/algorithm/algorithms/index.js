import cityblockApproveNeutralReject from './cityblock/approve-neutral-reject';
import cityblockApprovePartlyReject from './cityblock/approve-partly-reject';
import cityblockApprovePartlyLittleReject from './cityblock/approve-partly-little-reject';
import hybrid from './hybrid/hybrid';
import hybridVaahessen from './hybrid/hybrid-vaahessen';

export default {
  'cityblock/approve-neutral-reject': cityblockApproveNeutralReject,
  'cityblock/approve-partly-reject': cityblockApprovePartlyReject,
  'cityblock/approve-partly-little-reject': cityblockApprovePartlyLittleReject,
  hybrid,
  hybridVaahessen,
};
