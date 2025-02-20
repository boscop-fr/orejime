import {BannerComponent} from './Banner';
import {ContextualNoticeComponent} from './ContextualNotice';
import {GlobalConsentComponent} from './GlobalConsent';
import {ModalComponent} from './Modal';
import {ModalBannerComponent} from './ModalBanner';
import {PurposeComponent} from './Purpose';
import {PurposeListComponent} from './PurposeList';

export interface Theme {
	Banner: BannerComponent;
	ContextualNotice: ContextualNoticeComponent;
	GlobalConsent: GlobalConsentComponent;
	Modal: ModalComponent;
	ModalBanner: ModalBannerComponent;
	Purpose: PurposeComponent;
	PurposeList: PurposeListComponent;
}
